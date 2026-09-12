# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Ready, GSM** — A registration service for program experience and admission info sessions at 광주소프트웨어마이스터고등학교 (Gwangju Software Meister High School).

## Commands

Run from the repo root — scripts fan out to each app via [Turborepo](https://turborepo.com/):

```bash
pnpm dev          # Start development server(s)
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint with auto-fix
pnpm format       # Run Prettier (repo-wide)
pnpm format:check # Check formatting without writing
```

Pre-commit hooks (Husky + lint-staged) run ESLint and Prettier automatically on `*.ts` and `*.tsx` files.

## Monorepo Structure

This is a pnpm + Turborepo monorepo with two Next.js apps and one shared package:

```
apps/
├── client/   # Public site — program experience & info session applications
└── admin/    # Admin dashboard — activity/applicant management (entire app is auth-gated)
packages/
└── shared/   # Cross-app code: shared/* layer + entities used by both apps (activity, application)
```

- `apps/admin` gates **every route** via `apps/admin/src/middleware.ts` (checks `role === 'ADMIN' | 'ROOT'` against `/v1/user/me`, rewrites to `/not-found` otherwise). `apps/client` has no such middleware.
- ESLint, Prettier, Husky, lint-staged, and TypeScript are shared root-level devDependencies; each app/package only declares its own runtime/build deps (e.g. Next.js, React) and its own `eslint.config.mjs` / `tsconfig.json`.
- Each app imports shared code via the `@shared/*` path alias (maps to `packages/shared/src/*`), and its own code via `@/*`. `packages/shared` is consumed as TS source directly (no build step) — each app's `next.config.ts` lists it under `transpilePackages`.
- Adding code to `packages/shared` should only happen when it's genuinely needed by both apps — don't move something there speculatively.
- `NEXT_PUBLIC_API_BASE_URL` and other env vars live in each app's own `.env.local` (e.g. `apps/client/.env.local`, `apps/admin/.env.local`), not the repo root.
- Tailwind's `@import 'tailwindcss'` must stay in each app's own `src/app/globals.css` (never in `packages/shared`) — Tailwind v4's automatic class-usage scanning is rooted at that import, so moving it into the shared package would stop it from seeing each app's `src/**`. The shared design tokens/theme live in `packages/shared/src/styles/theme.css`, imported by each app's `globals.css`.
- Tailwind's automatic scanning is also **local to each app's own directory** — it does not reach into `packages/shared` by default. Because of this, each app's `globals.css` also has an explicit `@source '../../../../packages/shared/src';`. If a class is used only inside `packages/shared` (not also verbatim in the consuming app), it silently won't be generated unless this `@source` line exists. If you add a new app, add this same `@source` line to its `globals.css` too.

## Architecture: Feature-Sliced Design (FSD)

Each app strictly follows [Feature-Sliced Design](https://feature-sliced.design/). Layers must only import from layers below them — cross-layer imports at the same level are forbidden.

```
apps/{client,admin}/src/
├── app/       # Next.js routing, layouts, metadata, providers
├── views/     # Page-level components (compose widgets)
├── widgets/   # Standalone composite UI blocks
├── features/  # Feature-scoped logic (auth, forms, etc.)
├── entities/  # Business entities local to this app: types, schemas, API hooks, UI
└── shared/    # App-local shared layer: code only this app needs (currently client only)
```

**Import direction (strict):** `app` → `views` → `widgets` → `features` → `entities` → `shared`

There are **two** shared layers, and the aliases differ by one character:

| Alias        | Location                 | Use for                                |
| ------------ | ------------------------ | -------------------------------------- |
| `@shared/*`  | `packages/shared/src/`   | Code genuinely needed by **both** apps |
| `@/shared/*` | `apps/<app>/src/shared/` | Code only **one** app needs            |

Prefer the app-local `@/shared/*` by default. Promote to `packages/shared` only once a second app actually needs it — same rule as entities. Example: `apps/client/src/shared/lib/analytics.ts` holds GA4 tracking because GA is wired into client only (`apps/client/src/app/layout.tsx`); putting it in `packages/shared` would pull a client-only concern into admin.

`apps/admin` has no local `shared/` layer yet — create one only when it actually needs app-local shared code.

Each layer folder uses barrel exports via `index.ts`.

## Tech Stack

| Category      | Library                                                                       |
| ------------- | ----------------------------------------------------------------------------- |
| Framework     | Next.js (React 19, TypeScript 5)                                              |
| Data fetching | TanStack React Query 5                                                        |
| HTTP          | Axios (wrapped — use `get`, `post`, `patch`, `put`, `del` from `@shared/api`) |
| Forms         | React Hook Form + Zod                                                         |
| Styling       | Tailwind CSS 4, `cn()` utility (`clsx` + `tailwind-merge`)                    |
| Font          | Pretendard (local WOFF2, loaded via Next.js font loader)                      |

API requests are proxied: the Next.js config rewrites `/api/*` to `NEXT_PUBLIC_API_BASE_URL`.

## Code Conventions

### Components

- Arrow functions, `default export`
- Props via destructured `interface` (use `interface` for objects, `type` for unions)
- Internal ordering: hooks/variables → handlers → `useEffect` → `return`
- Type suffix: `Type` (e.g., `StatusType`); Schema suffix: `Schema` (e.g., `ExampleFormSchema`)

```tsx
interface ExampleProps {
  data: ExampleType[];
  isLoading: boolean;
}

const Example = ({ data, isLoading }: ExampleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(true);

  useEffect(() => {
    /* ... */
  }, []);

  return <div />;
};

export default Example;
```

### File/Folder Naming

- FSD 슬라이스 내 UI 컴포넌트: `{layer}/{slice}/ui/{Component}.tsx` (e.g., `widgets/header/ui/Header.tsx`)
  - `{slice}` 폴더명: `camelCase` (e.g., `header`, `homeProgramSection`)
  - `{Component}` 파일명: `PascalCase` (e.g., `Header.tsx`, `HomeProgramSection.tsx`)
  - UI 컴포넌트 파일은 `index.tsx`가 아닌 컴포넌트 이름으로 생성하세요.
- Hooks/utils/constants/types: `camelCase` (e.g., `useDebounce.ts`, `cookies.ts`)
- Asset components: `PascalCase.tsx` (e.g., `Logo.tsx`)
- 배럴 export: 각 슬라이스 루트에 `index.ts` 생성

### Styling

- Tailwind CSS only; 모든 `className`에 예외 없이 `cn()`을 사용하세요 (조건부 클래스 없이도 포함).
- Use CVA (`class-variance-authority`) for components with multiple variants
- Tailwind arbitrary value에서 `px` 단위를 사용하지 마세요 — Tailwind spacing scale 또는 `rem`/`em` 사용.
- 색상은 `packages/shared/src/styles/theme.css`에 선언된 CSS 변수를 우선 사용하세요. 해당 변수가 없는 경우에만 hex 값 사용 허용.
  - 예: `text-brand-primary`, `bg-surface-container`, `border-border-variant`
  - 주요 변수: `brand-primary`, `brand-accent`, `neutral-dark`, `deep-black`, `neutral-slate`, `cool-neutral`, `secondary-slate`, `soft-gray`, `base-fill`, `surface-container`, `pure-white`, `error-red` 등

### API Hooks (in `entities/` or `features/`)

Hook naming: `useGet<Resource>`, `usePost<Resource>`, `usePatch<Resource>`, `usePut<Resource>`, `useDelete<Resource>`

```ts
// Query keys — object with as const
export const exampleQueryKeys = {
  getExamples: (page?: number) => ['examples', 'list', { page }] as const,
  getExampleById: (id: number) => ['examples', 'detail', id] as const,
} as const;

// URL controller — object with functions
export const exampleUrl = {
  getExamples: () => '/api/v1/examples',
  getExampleById: (id: number) => `/api/v1/examples/${id}`,
} as const;
```

### Import Order (auto-sorted by Prettier plugin)

1. React imports
2. Next.js imports
3. External libraries
4. Shared package (`@shared/`) imports
5. Internal (`@/`) imports
6. Relative imports

## Claude 행동 규칙

- 작업 완료 후 자동으로 변경사항을 커밋하세요.
- 커밋 메시지는 `type: 설명` 형식을 따르세요 (scope 괄호 없음). 자세한 type 목록은 `.claude/commands/commit/references/scope-guide.md` 참고.
- **커밋은 반드시 Bash 도구로 git 명령어를 직접 실행하세요.** `/commit` Skill은 사용자가 명시적으로 `/commit`을 입력할 때만 사용합니다. 일반 작업 후 자동 커밋 시 Skill 도구를 호출하지 마세요.
- `git add .` 대신 변경된 파일을 명시적으로 스테이징하세요. `.env`, `.env.local` 등 환경변수 파일은 절대 포함하지 마세요.
- PR 제목은 `[type] 설명` 형식으로 작성하세요 (예: `[feat] 로그인 폼 추가`). `feat(scope): ...` 형식은 사용하지 않습니다.
- PR 리뷰 코멘트 처리는 `/fix-review` 커맨드를 사용하세요.

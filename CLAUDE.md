# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Ready, GSM** — A registration service for program experience and admission info sessions at 광주소프트웨어마이스터고등학교 (Gwangju Software Meister High School).

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint with auto-fix
pnpm format       # Run Prettier
pnpm format:check # Check formatting without writing
```

Pre-commit hooks (Husky + lint-staged) run ESLint and Prettier automatically on `*.ts` and `*.tsx` files.

## Architecture: Feature-Sliced Design (FSD)

The project strictly follows [Feature-Sliced Design](https://feature-sliced.design/). Layers must only import from layers below them — cross-layer imports at the same level are forbidden.

```
src/
├── app/       # Next.js routing, layouts, metadata, providers
├── views/     # Page-level components (compose widgets)
├── widgets/   # Standalone composite UI blocks
├── features/  # Feature-scoped logic (auth, forms, etc.)
├── entities/  # Business entities: types, schemas, API hooks, UI
└── shared/    # Shared utilities, hooks, styles, base components
```

**Import direction (strict):** `app` → `views` → `widgets` → `features` → `entities` → `shared`

Each layer folder uses barrel exports via `index.ts`.

## Tech Stack

| Category      | Library                                                                        |
| ------------- | ------------------------------------------------------------------------------ |
| Framework     | Next.js (React 19, TypeScript 5)                                               |
| Data fetching | TanStack React Query 5                                                         |
| HTTP          | Axios (wrapped — use `get`, `post`, `patch`, `put`, `del` from `@/shared/api`) |
| Forms         | React Hook Form + Zod                                                          |
| Styling       | Tailwind CSS 4, `cn()` utility (`clsx` + `tailwind-merge`)                     |
| Font          | Pretendard (local WOFF2, loaded via Next.js font loader)                       |

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

- Component folders: `PascalCase/index.tsx` (e.g., `Header/index.tsx`)
- Simple single-file components: `ui/header.tsx` (lowercase)
- Hooks/utils/constants/types: `camelCase` (e.g., `useDebounce.ts`, `cookies.ts`)
- Asset components: `PascalCase.tsx` (e.g., `Logo.tsx`)

### Styling

- Tailwind CSS only; use `cn()` for conditional/merged classes
- Use CVA (`class-variance-authority`) for components with multiple variants

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
4. Internal (`@/`) imports
5. Relative imports

## Claude 행동 규칙

- 작업 완료 후 자동으로 변경사항을 커밋하세요. 커밋 전 메시지만 확인받으세요.
- 커밋 메시지는 `.claude/commands/commit/references/scope-guide.md` 형식을 따르세요.

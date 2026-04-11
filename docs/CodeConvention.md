# 📋 코드 컨벤션

## 🏗️ 프로젝트 구조

### Feature-Sliced Design (FSD) 아키텍처

```
src/
├── app/         # Next.js 라우팅, layout, metadata
├── views/       # 페이지 컴포넌트 (여러 위젯 조합)
├── widgets/     # 독립적인 복합 UI 컴포넌트 블록
├── features/    # 기능 단위 로직 (인증 등)
├── entities/    # 비즈니스 엔티티 (타입, 스키마, 유틸)
└── shared/      # 공유 유틸리티, 훅, 스타일
```

> 📚 **학습 자료**
>
> - [Feature-Sliced Design 공식 문서](https://feature-sliced.design/)
> - [FSD 한글 번역 문서](https://feature-sliced.design/kr/)

### 계층별 의존성 규칙

- `app` → `views` → `widgets` → `features` → `entities` → `shared`
- 상위 계층은 하위 계층만 import 가능
- 같은 계층 간 import 금지

## 🗂️ 파일/폴더 네이밍

| 구분             | 네이밍 규칙 | 예시                          |
| ---------------- | ----------- | ----------------------------- |
| 컴포넌트 폴더    | PascalCase  | `Header/`, `ExampleList/`     |
| 컴포넌트 파일    | index.tsx   | `ExampleList/index.tsx`       |
| 유틸리티/훅 파일 | camelCase   | `useDebounce.ts`, `utils.ts`  |
| 상수 파일        | camelCase   | `cookies.ts`, `navigation.ts` |
| 타입 파일        | camelCase   | `example.ts`, `user.ts`       |
| 스키마 파일      | camelCase   | `schema.ts`                   |
| 에셋 파일        | PascalCase  | `Logo.tsx`, `EmptyState.tsx`  |

### UI 폴더 구조 규칙

- 기본적으로 컴포넌트는 `ui/<ComponentName>/index.tsx` 구조를 사용합니다.
- **단일 파일로 구성된 간단한 컴포넌트의 경우 폴더를 생성하지 않고 `ui/<component>.tsx` 형태로 작성할 수 있습니다.**

#### 예시

```bash
# 기본 구조 (복잡한 컴포넌트)
ui/
└── Header/
    ├── index.tsx
    └── Header.styles.ts

# 단일 파일 컴포넌트 (간단한 경우)
ui/
└── header.tsx
```

> 📚 **학습 자료**
>
> - [JavaScript 네이밍 컨벤션 가이드](https://www.robinwieruch.de/javascript-naming-conventions/)
> - [camelCase vs PascalCase 설명](https://www.freecodecamp.org/news/snake-case-vs-camel-case-vs-pascal-case-vs-kebab-case-whats-the-difference/)

## 📦 Import/Export 컨벤션

### 배럴 익스포트(Barrel Export)

- 각 폴더에 `index.ts`를 두고 `export * from` 또는 `export { default as ... }` 형태로 내보냅니다.

```ts
// entities/example/index.ts
export * from './model/mocks';
export * from './model/schema';
export * from './lib/utils';

// widgets/example/index.ts
export { default as ExampleList } from './ui/ExampleList';
export { default as ExampleFilter } from './ui/ExampleFilter';
```

> 📚 **학습 자료**
>
> - [JavaScript 모듈 시스템 이해하기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)
> - [배럴 익스포트 패턴 가이드](https://basarat.gitbook.io/typescript/main-1/barrel)

### Import 별칭

- `tsconfig.json`에 경로 별칭을 설정하여 사용합니다.
  - `@/*`: 앱 내부 경로

### Import 순서 (Prettier plugin으로 자동 정렬)

```ts
// 1. React 관련
import { useEffect, useState } from 'react';

// 2. Next.js 관련
import { usePathname, useRouter } from 'next/navigation';

// 3. 외부 라이브러리
import { useMutation, useQuery } from '@tanstack/react-query';

// 4. 내부 import
import { useGetExample } from '@/entities/example';
import { Button, Card } from '@/shared/ui';
import { cn } from '@/shared/utils';
```

## 🏷️ 타입 컨벤션

- 객체 타입: `interface` 사용을 기본으로 합니다.
- 간단한 유니온: `type`을 사용합니다.
- Enum: API 값과 화면 표시 값의 매핑에 사용합니다.
- 타입 네이밍: **PascalCase**
- 타입 접미사: `Type`으로 끝나는 네이밍을 사용합니다. (예: `StatusType`)

```ts
interface ExampleProps {
  isLoading: boolean;
  data: ExampleType[];
}

export type StatusType = 'ACTIVE' | 'INACTIVE' | 'PENDING';

export enum CategoryEnum {
  CATEGORY_A = 'Category A',
  CATEGORY_B = 'Category B',
}
```

> 📚 **학습 자료**
>
> - [TypeScript 핸드북 - Interface vs Type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
> - [TypeScript 기본 타입 가이드](https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html)

## 📝 Zod 스키마 컨벤션

- 스키마 네이밍: `<이름>Schema` 형태를 사용합니다. (PascalCase 권장)
- 폼 타입 추론: `z.infer<typeof schema>`를 사용합니다.

```ts
export const ExampleFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export type ExampleFormType = z.infer<typeof ExampleFormSchema>;
```

> 📚 **학습 자료**
>
> - [Zod 공식 문서](https://zod.dev/)
> - [Zod 한글 가이드](https://github.com/colinhacks/zod/blob/main/packages/docs-v3/README_KO.md)

## 🧩 컴포넌트 컨벤션

- 컴포넌트는 기본적으로 **화살표 함수(Arrow Function)** 로 작성합니다.
- 컴포넌트는 기본적으로 `default export` 로 내보냅니다.
- `props`는 **구조 분해 할당**으로 전달받습니다.
- **변수/훅으로 가져온 값**은 컴포넌트 상단에 위치합니다.
- **핸들러 함수 및 기타 로직**은 "변수 선언"과 `useEffect` 사이에 위치합니다.
- `useEffect`는 `return` 바로 위에 위치합니다.
- 객체 타입 선언은 기본적으로 `interface`를 사용합니다.

```tsx
interface ExamplePageProps {
  data: ExampleDataType | undefined;
  isLoading: boolean;
}

const ExamplePage = ({ data, isLoading }: ExamplePageProps) => {
  // 1. 변수/훅 선언
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: fetchedData } = useGetExample();

  // 2. 핸들러 함수 및 기타 로직
  const handleClick = () => {
    setIsOpen(true);
  };

  // 3. useEffect
  useEffect(() => {
    // ...
  }, []);

  // 4. return
  return <div>...</div>;
};

export default ExamplePage;
```

> 📚 **학습 자료**
>
> - [JavaScript 구조 분해 할당 기본](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
> - [React Props 구조 분해 할당 패턴](https://react.dev/learn#sharing-data-between-components)

## 🎨 스타일링 컨벤션

- **Tailwind CSS**를 사용합니다.
- `clsx` + `tailwind-merge` 기반의 `cn()` 유틸리티를 사용합니다.
- 클래스명은 가능한 한 **하나의 문자열**로 관리합니다.
- 버튼 등 다양한 변형이 있는 컴포넌트는 **CVA(class-variance-authority)** 사용을 권장합니다.

```ts
// cn() 기본 사용
className={cn('flex gap-2 items-center')}

// 조건부 클래스
className={cn('flex gap-2', isActive && 'bg-primary')}

// 여러 조건 조합
className={cn('flex gap-2 items-center', isActive && 'bg-primary', isDisabled && 'opacity-50')}
```

> 📚 **학습 자료**
>
> - [Tailwind CSS 공식 문서](https://tailwindcss.com/docs/installation/using-vite)
> - [CVA (class-variance-authority) 문서](https://cva.style/docs)

## 🔗 API 컨벤션

- React Query(TanStack Query)를 사용합니다.

### 훅 네이밍

- GET: `useGet<리소스명>` (예: `useGetExample`, `useGetExamples`)
- POST: `usePost<리소스명>` (예: `usePostExample`)
- PATCH: `usePatch<리소스명>` (예: `usePatchExample`)
- PUT: `usePut<리소스명>` (예: `usePutExample`)
- DELETE: `useDelete<리소스명>` (예: `useDeleteExample`)

### Query Keys

- 객체로 관리하고 `as const`로 타입을 고정합니다.

```ts
export const exampleQueryKeys = {
  getExamples: (page?: number, size?: number, filter?: string) =>
    ['examples', 'list', { page, size, filter }] as const,
  getExampleById: (id: number) => ['examples', 'detail', id] as const,
  postExample: () => ['examples', 'create'] as const,
  putExampleById: () => ['examples', 'update'] as const,
} as const;
```

### URL Controller

- URL 경로를 객체로 관리합니다.

```ts
export const exampleUrl = {
  getExamples: () => '/api/v1/examples',
  getExampleById: (id: number) => `/api/v1/examples/${id}`,
  postExample: () => '/api/v1/examples',
  putExampleById: (id: number) => `/api/v1/examples/${id}`,
} as const;
```

### HTTP 메서드 래퍼

```ts
export const get = async <T>(...args: Parameters<typeof axiosInstance.get>) =>
  await axiosInstance.get<T, T>(...args);

export const post = async <T>(...args: Parameters<typeof axiosInstance.post>) =>
  await axiosInstance.post<T, T>(...args);
```

> 📚 **학습 자료**
>
> - [TanStack Query 공식 문서](https://tanstack.com/query/latest/docs/framework/react/overview)
> - [TanStack Query 한글 문서](https://react-query.kro.kr/docs/getting-started)

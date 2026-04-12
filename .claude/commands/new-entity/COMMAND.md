# /new-entity

FSD `entities` 레이어에 새 entity를 스캐폴딩합니다.

## 사용법

```
/new-entity <name>
```

예시: `/new-entity program`, `/new-entity user`

## 생성 구조

`src/entities/<name>/` 아래에 아래 파일들을 생성하세요:

```
src/entities/<name>/
├── index.ts
├── model/
│   ├── types.ts
│   ├── queryKeys.ts
│   ├── url.ts
│   └── hooks.ts
└── ui/
    └── <EntityCard>/
        └── index.tsx
```

## 규칙

- `<name>`은 camelCase (예: `program`, `user`)
- Hook 네이밍: `useGet<Resource>`, `usePost<Resource>`, `usePatch<Resource>`, `usePut<Resource>`, `useDelete<Resource>`
- API 요청은 반드시 `@/shared/api`의 `get`, `post`, `patch`, `put`, `del` 사용 (Axios 직접 사용 금지)
- `entities` 레이어는 `shared` 레이어만 import 가능

## 보일러플레이트

**`src/entities/<name>/model/types.ts`:**

```ts
export interface <Name>Type {
  id: number;
  // 필드를 추가하세요
}
```

**`src/entities/<name>/model/queryKeys.ts`:**

```ts
export const <name>QueryKeys = {
  get<Name>s: () => ['<name>s', 'list'] as const,
  get<Name>ById: (id: number) => ['<name>s', 'detail', id] as const,
} as const;
```

**`src/entities/<name>/model/url.ts`:**

```ts
export const <name>Url = {
  get<Name>s: () => '/api/v1/<name>s',
  get<Name>ById: (id: number) => `/api/v1/<name>s/${id}`,
} as const;
```

**`src/entities/<name>/model/hooks.ts`:**

```ts
import { useQuery } from '@tanstack/react-query';

import { get } from '@/shared/api';

import type { <Name>Type } from './types';
import { <name>QueryKeys } from './queryKeys';
import { <name>Url } from './url';

export const useGet<Name>s = () =>
  useQuery({
    queryKey: <name>QueryKeys.get<Name>s(),
    queryFn: () => get<<Name>Type[]>(<name>Url.get<Name>s()),
  });
```

**`src/entities/<name>/index.ts`:**

```ts
export { useGet<Name>s } from './model/hooks';
export type { <Name>Type } from './model/types';
```

인수($ARGUMENTS)에서 entity 이름을 읽어 위 구조대로 파일들을 생성하세요.

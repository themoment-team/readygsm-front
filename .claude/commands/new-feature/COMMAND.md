# /new-feature

FSD `features` 레이어에 새 feature를 스캐폴딩합니다.

## 사용법

```
/new-feature <name>
```

예시: `/new-feature auth`, `/new-feature registration`

## 생성 구조

`src/features/<name>/` 아래에 아래 파일들을 생성하세요:

```
src/features/<name>/
├── index.ts
├── model/
│   └── types.ts
└── ui/
    └── <ComponentName>/
        └── index.tsx
```

## 규칙

- `<name>`은 camelCase (예: `auth`, `programRegistration`)
- `<ComponentName>`은 PascalCase (예: `AuthForm`)
- 컴포넌트는 화살표 함수 + `export default`
- Props는 `interface`로 정의
- `features` 레이어는 `entities`, `shared` 레이어만 import 가능

## 보일러플레이트

**`src/features/<name>/model/types.ts`:**

```ts
export interface <Name>Type {
  // 필드를 여기에 정의하세요
}
```

**`src/features/<name>/ui/<ComponentName>/index.tsx`:**

```tsx
interface <ComponentName>Props {
  // props를 여기에 정의하세요
}

const <ComponentName> = ({}: <ComponentName>Props) => {
  return <div />;
};

export default <ComponentName>;
```

**`src/features/<name>/index.ts`:**

```ts
export { default as <ComponentName> } from './ui/<ComponentName>';
export type { <Name>Type } from './model/types';
```

인수($ARGUMENTS)에서 feature 이름을 읽어 위 구조대로 파일들을 생성하세요.

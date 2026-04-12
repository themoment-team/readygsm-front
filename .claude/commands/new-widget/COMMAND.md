# /new-widget

FSD `widgets` 레이어에 새 widget을 스캐폴딩합니다.

## 사용법

```
/new-widget <name>
```

예시: `/new-widget header`, `/new-widget programSection`

## 생성 구조

`src/widgets/<name>/` 아래에 아래 파일들을 생성하세요:

```
src/widgets/<name>/
├── index.ts
└── ui/
    └── index.tsx
```

## 규칙

- `<name>`은 camelCase (예: `header`, `programSection`)
- 컴포넌트 이름은 PascalCase (예: `Header`, `ProgramSection`)
- `widgets` 레이어는 `features`, `entities`, `shared` 레이어만 import 가능

## 보일러플레이트

**`src/widgets/<name>/ui/index.tsx`:**

```tsx
const <ComponentName> = () => {
  return (
    <section>
      {/* 내용을 여기에 작성하세요 */}
    </section>
  );
};

export default <ComponentName>;
```

**`src/widgets/<name>/index.ts`:**

```ts
export { default as <ComponentName> } from './ui';
```

인수($ARGUMENTS)에서 widget 이름을 읽어 위 구조대로 파일들을 생성하세요.

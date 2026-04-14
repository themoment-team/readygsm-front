# /fsd-check

현재 프로젝트의 FSD(Feature-Sliced Design) import 규칙 위반을 검사합니다.

## FSD 레이어 import 규칙

허용되는 방향 (위 → 아래만 가능):

```
app → views → widgets → features → entities → shared
```

| 레이어     | import 가능                                | import 불가                             |
| ---------- | ------------------------------------------ | --------------------------------------- |
| `app`      | views, widgets, features, entities, shared | —                                       |
| `views`    | widgets, features, entities, shared        | app                                     |
| `widgets`  | features, entities, shared                 | app, views                              |
| `features` | entities, shared                           | app, views, widgets                     |
| `entities` | shared                                     | app, views, widgets, features           |
| `shared`   | (외부 라이브러리만)                        | app, views, widgets, features, entities |

## 검사 방법

`src/` 아래의 모든 `.ts`, `.tsx` 파일에서 `@/` import를 분석해 위 규칙 위반을 찾아주세요.

파일 경로에서 레이어를 판단합니다:

- `src/app/` → `app`
- `src/views/` → `views`
- `src/widgets/` → `widgets`
- `src/features/` → `features`
- `src/entities/` → `entities`
- `src/shared/` → `shared`

## 출력 형식

위반이 있는 경우:

```
[FSD 위반] src/entities/program/ui/ProgramCard/index.tsx
  - import '@/features/auth' — entities는 features를 import할 수 없음
  수정 방법: props나 composition으로 의존성을 역전시키세요.
```

위반이 없는 경우:

```
FSD import 규칙 위반 없음. 모든 레이어 의존성이 올바릅니다.
```

지금 바로 `src/` 디렉토리를 검사하세요.

# /code-review

현재 변경된 파일을 FSD 컨벤션과 코드 품질 기준으로 리뷰합니다.

## 사용법

```
/code-review
```

## 검토 순서

1. `git diff main...HEAD` 또는 `git diff` 로 변경 내용 파악
2. 아래 체크리스트 기준으로 각 파일 검토
3. 문제가 있는 경우 파일 경로와 라인 번호를 명시해서 리포트

## 체크리스트

### FSD 레이어 규칙

- [ ] 레이어 import 방향 준수: `app → views → widgets → features → entities → shared`
- [ ] 같은 레이어 간 cross-import 없음
- [ ] 각 레이어의 `index.ts` barrel export 사용

### 컴포넌트 컨벤션

- [ ] 화살표 함수 + `default export` 사용
- [ ] Props는 `interface`로 선언 (union은 `type`)
- [ ] 내부 순서: hooks/variables → handlers → `useEffect` → `return`
- [ ] 컴포넌트 폴더: `PascalCase/index.tsx`

### 타입 안전성

- [ ] `any` 타입 미사용
- [ ] 타입 suffix 규칙: `StatusType`, `ExampleFormSchema`
- [ ] API 응답 타입 명시

### API / 데이터 페칭

- [ ] `@/shared/api`의 `get`, `post`, `patch`, `put`, `del` 래퍼 사용 (axios 직접 사용 금지)
- [ ] query key: `exampleQueryKeys` 객체 패턴
- [ ] hook 네이밍: `useGet<Resource>`, `usePost<Resource>` 등

### 보안

- [ ] 환경변수 하드코딩 없음 (API 키, 비밀번호 등)
- [ ] `NEXT_PUBLIC_` 변수가 클라이언트에 민감 정보 노출 안 함
- [ ] XSS 위험 있는 `dangerouslySetInnerHTML` 미사용

### 스타일

- [ ] Tailwind CSS만 사용 (인라인 style 지양)
- [ ] 조건부 클래스에 `cn()` 사용
- [ ] 다중 variant는 CVA 사용

## 출력 형식

```
## 코드 리뷰 결과

### 통과 ✅
- ...

### 개선 필요 ⚠️

**src/features/auth/ui/LoginForm/index.tsx**
- [FSD] entities를 import하는 건 OK지만, 같은 features 레이어의 다른 슬라이스를 import하고 있음 (라인 5)
  → 수정: shared로 옮기거나 props로 전달

**src/entities/program/api/hooks.ts**
- [컨벤션] axios를 직접 사용하고 있음 (라인 12)
  → 수정: `import { get } from '@/shared/api'` 로 교체
```

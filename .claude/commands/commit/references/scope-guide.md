# Commit Scope 가이드

## 형식

```
type : 설명
```

## Type 목록

| type       | 설명                              |
| ---------- | --------------------------------- |
| `feat`     | 새로운 기능 추가                  |
| `fix`      | 버그 수정                         |
| `refactor` | 리팩토링 (기능 변경 없음)         |
| `style`    | 코드 스타일 변경 (로직 변경 없음) |
| `docs`     | 문서 수정                         |
| `test`     | 테스트 추가/수정                  |
| `chore`    | 빌드, 설정 등 기타 작업           |
| `build`    | 빌드 시스템, 패키지 변경          |
| `ci`       | CI/CD 관련 변경                   |
| `revert`   | 커밋 되돌리기                     |
| `merge`    | 브랜치 병합                       |

## 예시

```
feat : 로그인 폼 컴포넌트 추가
fix : 프로그램 목록 조회 오류 수정
refactor : cn 유틸 함수 타입 개선
docs : CLAUDE.md 코드 컨벤션 문서 추가
chore : ESLint 규칙 추가
```

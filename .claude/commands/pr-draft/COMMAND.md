# /pr-draft

현재 브랜치를 push하고 PR을 생성합니다.

## 사용법

```
/pr-draft
```

## 실행 순서

1. `git log main..HEAD` 로 현재 브랜치의 커밋 목록 확인
2. `git diff main...HEAD` 로 전체 변경 내용 분석
3. 아래 PR 템플릿에 맞게 내용 작성 (한국어)
4. 사용자에게 PR 제목과 본문 확인 요청
5. 승인되면 아래 순서로 실행:

```bash
# 1. 현재 브랜치 push
git push -u origin HEAD

# 2. PR 생성
bash .claude/commands/pr-draft/scripts/create-pr.sh "<제목>" "<본문>"
```

## PR 템플릿

`.github/PULL_REQUEST_TEMPLATE.md` 형식을 따르세요:

```markdown
## 개요 💡

> 이 PR의 목적과 배경

## 작업내용 ⌨️

> 작업한 구체적인 내용 (불릿 리스트)

## 스크린샷/동영상 📸

> UI 변경이 있는 경우 첨부 (없으면 섹션 삭제)

## 관련 이슈 🚨

> 관련 이슈 번호 (없으면 섹션 삭제)
> 예: close #12

## 리뷰 요청사항 👀

> 집중 리뷰 요청 사항 (없으면 섹션 삭제)
```

## 주의사항

- `gh` CLI가 설치되어 있어야 합니다 (`gh auth login` 인증 필요)
- push 및 PR 생성 전 반드시 사용자에게 확인받으세요
- base 브랜치는 `develop`이 있으면 `develop`, 없으면 `main`으로 자동 설정됩니다

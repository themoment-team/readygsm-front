# /fix-review

현재 브랜치의 PR 리뷰 코멘트를 읽고, 코드를 수정한 뒤 커밋/푸시하고 각 코멘트에 답글을 답니다.

## 사용법

```
/fix-review
```

## 실행 순서

### 1단계 — 리뷰 코멘트 수집

```bash
bash .claude/commands/fix-review/scripts/get-reviews.sh
```

출력에서 다음을 파악하세요:

- 각 코멘트의 **ID** (답글용)
- **파일 경로 및 라인** (인라인 코멘트)
- **요청 내용** (무엇을 수정해야 하는지)

### 2단계 — 코드 수정

각 코멘트를 분석하고 코드를 수정하세요.

- 코멘트가 명확한 수정 요청이면 즉시 반영
- 질문성 코멘트(의견, 논의)는 수정 없이 답글만
- `WONTFIX` 또는 반려할 내용이면 답글로 이유 설명

### 3단계 — 커밋 및 푸시

수정이 완료되면 아래 순서로 커밋하세요.

```bash
# 1. 변경된 파일만 명시적으로 스테이징 (.env 계열 제외)
git add <변경된 파일들>

# 2. 커밋 (scope-guide.md 형식 준수, 한국어 설명)
git commit -m "fix: 리뷰 반영 - <수정 내용 요약>"

# 3. 현재 브랜치에 푸시
git push
```

커밋 메시지는 `.claude/commands/commit/references/scope-guide.md`를 따르세요.
수정 사항이 여러 관심사에 걸쳐있다면 논리적 단위로 나눠 커밋하세요.

### 4단계 — 답글

코멘트 종류에 따라 아래 스크립트로 답글을 답니다.

**인라인 코멘트 답글** (get-reviews.sh 출력의 `ID:` 값 사용):

```bash
bash .claude/commands/fix-review/scripts/reply-review.sh inline <comment_id> "<답글 내용>"
```

**전체 리뷰 답글** (PR 번호 사용):

```bash
bash .claude/commands/fix-review/scripts/reply-review.sh general <pr_number> "<답글 내용>"
```

#### 답글 작성 원칙

- 수정 완료: `"반영했습니다. <변경 내용 한 줄 요약>"` 형태로 간결하게
- 수정 없이 동의: `"맞습니다, 반영했습니다."`
- 반려/논의: 이유를 명확히 설명
- 답글은 **한국어**로 작성

## 주의사항

- `gh` CLI가 설치·인증되어 있어야 합니다 (`gh auth login`)
- 코드 수정 없이 답글만 달아야 하는 경우 커밋/푸시는 생략
- 리뷰가 없는 경우 스크립트가 안내 메시지를 출력하고 종료됩니다

#!/bin/bash
# PR 생성 스크립트
# 사용법: bash create-pr.sh "<title>" "<body>"

TITLE="$1"
BODY="$2"

# gh CLI 경로 탐색 (Windows 환경 대응)
if command -v gh &>/dev/null; then
  GH="gh"
elif [ -f "/c/Program Files/GitHub CLI/gh.exe" ]; then
  GH="/c/Program Files/GitHub CLI/gh.exe"
else
  echo "Error: gh CLI를 찾을 수 없습니다. gh auth login 을 실행하세요."
  exit 1
fi

# 현재 브랜치
CURRENT_BRANCH=$(git branch --show-current)

# base 브랜치 결정
if git show-ref --quiet refs/heads/develop || git show-ref --quiet refs/remotes/origin/develop; then
  BASE_BRANCH="develop"
else
  BASE_BRANCH="main"
fi

# 브랜치 prefix → 라벨 자동 감지
PREFIX=$(echo "$CURRENT_BRANCH" | cut -d'/' -f1)
case "$PREFIX" in
  feat)     LABEL="✨ feat - 기능 개발" ;;
  fix)      LABEL="🐛 fix - 버그 수정" ;;
  docs)     LABEL="📝 docs - 문서 작업" ;;
  refactor) LABEL="♻️ refactor - 리팩토링" ;;
  chore)    LABEL="🔧 chore - 기타 작업" ;;
  design)   LABEL="🎨 design - UI/UX 변경" ;;
  perf)     LABEL="💪 perf - 성능 개선" ;;
  *)        LABEL="" ;;
esac

# 리뷰어 설정 (reviewers.txt에서 읽기)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/../reviewers.txt"
REVIEWERS=""
if [ -f "$CONFIG_FILE" ]; then
  REVIEWERS=$(grep -v '^#' "$CONFIG_FILE" | grep -v '^[[:space:]]*$' | paste -sd ',' -)
fi

echo "브랜치: $CURRENT_BRANCH → $BASE_BRANCH"
echo "라벨: ${LABEL:-없음}"
echo "리뷰어: ${REVIEWERS:-없음}"
echo "PR 생성 중..."

# gh pr create 명령 구성
CMD=("$GH" pr create
  --title "$TITLE"
  --body "$BODY"
  --base "$BASE_BRANCH"
  --head "$CURRENT_BRANCH"
  --assignee "@me"
)

[ -n "$LABEL" ]     && CMD+=(--label "$LABEL")
[ -n "$REVIEWERS" ] && CMD+=(--reviewer "$REVIEWERS")

"${CMD[@]}"

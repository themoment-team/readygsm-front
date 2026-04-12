#!/bin/bash
# PR 생성 스크립트
# 사용법: bash create-pr.sh "<title>" "<body>"

TITLE="$1"
BODY="$2"

# 현재 브랜치
CURRENT_BRANCH=$(git branch --show-current)

# base 브랜치 결정
if git show-ref --quiet refs/heads/develop; then
  BASE_BRANCH="develop"
else
  BASE_BRANCH="main"
fi

echo "브랜치: $CURRENT_BRANCH → $BASE_BRANCH"
echo "PR 생성 중..."

gh pr create \
  --title "$TITLE" \
  --body "$BODY" \
  --base "$BASE_BRANCH" \
  --head "$CURRENT_BRANCH"

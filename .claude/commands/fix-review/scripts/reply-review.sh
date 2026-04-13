#!/bin/bash
# PR 리뷰 코멘트에 답글 달기
#
# 사용법:
#   bash reply-review.sh inline <comment_id> <message>   # 인라인 코멘트 답글
#   bash reply-review.sh general <pr_number> <message>   # 전체 PR 코멘트
#
# 인라인 코멘트 답글: GitHub Pull Request Review Comment Reply API 사용
# 전체 리뷰 답글: Issue Comment로 생성 (GitHub은 Review 자체에 답글 API 없음)

TYPE=$1
ID=$2
MESSAGE=$3

if [[ -z "$TYPE" || -z "$ID" || -z "$MESSAGE" ]]; then
  echo "Usage: $0 <inline|general> <comment_id|pr_number> <message>"
  exit 1
fi

if [[ "$TYPE" == "inline" ]]; then
  PR_NUMBER=$(gh pr view --json number --jq '.number' 2>/dev/null)
  if [[ -z "$PR_NUMBER" ]]; then
    echo "❌ 현재 브랜치에 열린 PR이 없습니다."
    exit 1
  fi
  gh api "repos/:owner/:repo/pulls/$PR_NUMBER/comments/$ID/replies" \
    --method POST \
    --field body="$MESSAGE"
elif [[ "$TYPE" == "general" ]]; then
  gh api "repos/:owner/:repo/issues/$ID/comments" \
    --method POST \
    --field body="$MESSAGE"
else
  echo "❌ type은 'inline' 또는 'general'이어야 합니다."
  exit 1
fi

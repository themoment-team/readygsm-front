#!/bin/bash
# 현재 브랜치의 PR 리뷰 코멘트 조회
# 출력: PR 번호, 리뷰 코멘트 (파일경로 + 라인 + 내용)

PR_NUMBER=$(gh pr view --json number --jq '.number' 2>/dev/null)

if [[ -z "$PR_NUMBER" ]]; then
  echo "❌ 현재 브랜치에 열린 PR이 없습니다."
  echo "   먼저 /pr-draft 로 PR을 생성하세요."
  exit 1
fi

echo "=== PR #$PR_NUMBER 리뷰 코멘트 ==="
echo ""

# 인라인 리뷰 코멘트 (코드 라인에 달린 것)
echo "--- 인라인 코멘트 ---"
gh api "repos/{owner}/{repo}/pulls/$PR_NUMBER/comments" \
  --jq '.[] | "[\(.path):\(.line // .original_line)]\n작성자: \(.user.login)\n내용: \(.body)\n---"'

echo ""

# 일반 리뷰 코멘트 (전체 PR에 달린 것)
echo "--- 전체 리뷰 ---"
gh api "repos/{owner}/{repo}/pulls/$PR_NUMBER/reviews" \
  --jq '.[] | select(.body != "") | "작성자: \(.user.login) [\(.state)]\n내용: \(.body)\n---"'

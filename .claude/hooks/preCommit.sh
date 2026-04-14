#!/bin/bash
# PreCommit: 커밋 메시지 형식 검증
# 허용 형식: type(scope?): description 또는 type: description
# 사용법: bash .claude/hooks/preCommit.sh <commit-msg-file>

COMMIT_MSG_FILE="$1"
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

ALLOWED_TYPES="feat|fix|refactor|style|docs|test|chore|build|ci|revert|merge"

if ! echo "$COMMIT_MSG" | grep -qE "^($ALLOWED_TYPES)(\(.+\))?: .+"; then
  echo "❌ 커밋 메시지 형식 오류"
  echo ""
  echo "올바른 형식: type(scope?): description"
  echo ""
  echo "허용되는 type:"
  echo "  feat     새로운 기능"
  echo "  fix      버그 수정"
  echo "  refactor 리팩토링"
  echo "  style    코드 스타일 변경 (로직 변경 없음)"
  echo "  docs     문서 수정"
  echo "  test     테스트 추가/수정"
  echo "  chore    빌드, 설정 등 기타 작업"
  echo "  build    빌드 시스템 변경"
  echo "  ci       CI/CD 관련"
  echo "  revert   커밋 되돌리기"
  echo "  merge    브랜치 병합"
  echo ""
  echo "예시: feat(auth): 로그인 폼 추가"
  exit 1
fi

echo "✅ 커밋 메시지 형식 확인 완료"

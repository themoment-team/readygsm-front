#!/bin/bash
# PreToolUse: 위험한 명령어 차단

TOOL_NAME="$1"
TOOL_INPUT="$2"

if [[ "$TOOL_NAME" == "Bash" ]]; then
  # 위험 패턴 목록
  DANGEROUS_PATTERNS=(
    "rm -rf /"
    "rm -rf \*"
    "curl.*sh"
    "wget.*sh"
    "chmod 777"
    "> /dev/sda"
    "dd if="
    "mkfs\."
    "DROP TABLE"
    "DROP DATABASE"
  )

  for pattern in "${DANGEROUS_PATTERNS[@]}"; do
    if echo "$TOOL_INPUT" | grep -qiE "$pattern"; then
      echo "⛔ 위험한 명령어가 감지되어 차단되었습니다: $pattern"
      echo "   명령어를 다시 확인하세요."
      exit 2
    fi
  done
fi

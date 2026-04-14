#!/bin/bash
# PostToolUse: Write/Edit 후 자동으로 lint 실행

TOOL_NAME="$1"

if [[ "$TOOL_NAME" == "Write" || "$TOOL_NAME" == "Edit" ]]; then
  echo "🔍 lint 검사 중..."
  pnpm lint 2>&1 | tail -20
fi

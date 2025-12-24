#!/bin/sh

# SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
#
# SPDX-License-Identifier: MIT

FILE="src/frontend/cloud-resume/pnpm-lock.yaml"
HEADER="# SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger\n#\n# SPDX-License-Identifier: MIT"

grep -q "SPDX-License-Identifier" "$FILE"
if [ $? -ne 0 ]; then
  tmpfile=$(mktemp)
  echo "$HEADER" > "$tmpfile"
  cat "$FILE" >> "$tmpfile"
  mv "$tmpfile" "$FILE"
  echo "SPDX header added to $FILE."
else
  echo "SPDX header already present in $FILE."
fi

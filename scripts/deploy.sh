#!/usr/bin/env bash
# Local deploy fallback for when you would rather not put credentials in GitHub.
#
# Create .env.deploy in the project root (it is gitignored) with:
#   FTP_HOST=...
#   FTP_USER=...
#   FTP_PASSWORD=...
#   FTP_TARGET_DIR=/public_html/new
#
# Then: npm run deploy
set -euo pipefail
cd "$(dirname "$0")/.."

[ -f .env.deploy ] || { echo "Missing .env.deploy — see the header of scripts/deploy.sh"; exit 1; }
set -a; . ./.env.deploy; set +a

: "${FTP_HOST:?}" "${FTP_USER:?}" "${FTP_PASSWORD:?}" "${FTP_TARGET_DIR:?}"
command -v lftp >/dev/null || { echo "lftp not installed. brew install lftp"; exit 1; }

echo "Building…"
npm run build

echo "Mirroring dist/ -> ${FTP_TARGET_DIR} on ${FTP_HOST}"
echo "This makes the remote directory match dist/ exactly, deleting anything else in it."
read -r -p "Continue? [y/N] " reply
[ "$reply" = "y" ] || { echo "Aborted."; exit 1; }

lftp -c "
  set ftp:ssl-force true;
  set ftp:ssl-protect-data true;
  set ssl:verify-certificate true;
  open -u \"$FTP_USER\",\"$FTP_PASSWORD\" \"$FTP_HOST\";
  mirror --reverse --delete --parallel=4 --verbose=1 dist/ \"$FTP_TARGET_DIR\";
"
echo "Done."

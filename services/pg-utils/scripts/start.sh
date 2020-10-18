#!/bin/bash
set -e

COMMAND=${1:-help}

function help {
  echo "#####################################"
  echo "### PG_UTILS                      ###"
  echo "#####################################"
}

# Reset AWS credentials
rm -rf ~/.aws
mkdir -p ~/.aws
echo "[default]" >> ~/.aws/credentials
echo "aws_access_key_id = ${AWS_ACCESS_KEY}" >> ~/.aws/credentials
echo "aws_secret_access_key = ${AWS_ACCESS_SECRET}" >> ~/.aws/credentials

if [[ "$COMMAND" == 'ls' ]]; then
  exec /scripts/list.sh
elif [[ "$COMMAND" == 'oo' ]]; then
  echo "OOOOO"
elif [[ "$COMMAND" == 'help' ]]; then
  help
else
  help
fi
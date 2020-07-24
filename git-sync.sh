#!/bin/sh

set -e

SOURCE_REPO=$1
DESTINATION_REPO=$2
USERNAME=$3
USER_PASSWORD=$4

SOURCE_REPO="https://${USERNAME}:${USER_PASSWORD}@github.com/${SOURCE_REPO}.git"
DESTINATION_REPO="https://${USERNAME}:${USER_PASSWORD}@github.com/${DESTINATION_REPO}.git"

echo "SOURCE=$SOURCE_REPO"
echo "DESTINATION=$DESTINATION_REPO"

git clone "$SOURCE_REPO" /root/source --origin source && cd /root/source
git remote add destination "$DESTINATION_REPO"

# Pull all branches references down locally so subsequent commands can see them
git fetch source '+refs/heads/*:refs/heads/*' --update-head-ok

# Print out all branches
git --no-pager branch -a -vv

git push destination --all -f
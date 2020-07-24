#!/bin/sh

mkdir -p ~/.ssh
cp /root/.ssh/* ~/.ssh/ 2> /dev/null || true 

sh -c "/git-sync.sh $*"
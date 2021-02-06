#!/usr/bin/env bash

while [ true ]
do
  git fetch origin
  DIFF=$(git diff master origin/master)

  if [ -z "$DIFF" ]
  then
    echo "No changes..."
  else
    # Pull the changes
    git pull --no-edit origin master

    screen -S xi -X stuff "^C"
    sleep 5
    screen -S xi -X stuff './run-prod.sh\n'
  fi

  sleep 60
done

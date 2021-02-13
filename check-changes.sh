#!/usr/bin/env bash

# This script can be started in its own screen at startup.
#
# In `/etc/rc.local`, for example:
#   su - bart -c "screen -dmS xi_chk"
#   su - bart -c "screen -S xi_chk -X stuff 'cd /home/bart/development/xi && ./check-changes.sh\n'"

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

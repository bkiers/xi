#!/usr/bin/env bash

# Check every minute if there are any changes made to `master`, and if so, pull the changes and
# restart the `xi` screen that is running the Xi app.
#
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

    # Send a CTRL+C to the `xi` screen
    screen -S xi -X stuff "^C"
    # Wait a bit so that the process can stop
    sleep 5
    # Restart the Xi app again
    screen -S xi -X stuff './run-prod.sh\n'
  fi

  # Wait 60 seconds
  sleep 60
done

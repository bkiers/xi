#!/usr/bin/env bash

# Run the Xi app in production mode.
#
# This script can be started in its own screen at startup.
#
# In `/etc/rc.local`, for example:
#   su - SOME_USER -c "screen -dmS xi"
#   su - SOME_USER -c "screen -S xi -X stuff 'cd /path/to/xi && ./run-prod.sh\n'"

export NODE_ENV=production

date > deploy.txt

npm run build

./node_modules/.bin/sequelize db:migrate --env production

node dist/main

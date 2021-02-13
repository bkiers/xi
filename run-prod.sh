#!/usr/bin/env bash

# This script can be started in its own screen at startup.
# Iin `/etc/rc.local`, for example:
#   su - bart -c "screen -dmS xi"
#   su - bart -c "screen -S xi -X stuff 'cd /home/bart/development/xi && ./run-prod.sh\n'"

export NODE_ENV=production

date > deploy.txt

npm run build

./node_modules/.bin/sequelize db:migrate --env production

node dist/main

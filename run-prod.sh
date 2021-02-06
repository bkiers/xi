#!/usr/bin/env bash

export XI_ENV=production
export XI_LAST_DEPLOY=$(date)

npm run build

./node_modules/.bin/sequelize db:migrate --env production

node dist/main

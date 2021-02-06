#!/usr/bin/env bash

export XI_ENV=production

date > deploy.txt

npm run build

./node_modules/.bin/sequelize db:migrate --env production

node dist/main

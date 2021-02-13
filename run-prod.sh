#!/usr/bin/env bash

export NODE_ENV=production

npm run build

./node_modules/.bin/sequelize db:migrate --env production

node dist/main

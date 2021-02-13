# Xi - Correspondence Chinese Chess 

[![CircleCI](https://circleci.com/gh/bkiers/xi.svg?style=svg)](https://circleci.com/gh/bkiers/xi)

A small [NestJS](https://nestjs.com/) app to play correspondence [Chinese Chess](https://en.wikipedia.org/wiki/Xiangqi).

![Xi screen](public/images/xi.png)

## Getting started

To run the app on your local machine, do the following:

- copy `config/development.env_EXAMPLE` to `config/development.env` and adjust any 
  values. The default values will work out of the box.
- add some sample data (users and a single game) to the database by running `npm run seed:run` 
  (check the usernames and passwords in the seed files in `./seeders/*.js`)
- run the app by executing `npm run start` and go to [localhost:3030](http://localhost:3030)

There is a single frontend controller (`AppController`) responsible for the hand full of 
views. The other controllers (`UserController`, `GameController` and `AuthController`) are 
API controllers and are available through the Swagger page [localhost:3030/api](http://localhost:3030/api).

When testing the API through the interactive Swagger page, be sure to login first, and set 
the auth token in the Swagger page (using the `Authorize` button)

## Tests

To run unt tests, do:
```
npm run test
```

## Migrations

Generate a migration:
```
npx sequelize-cli migration:generate --name migration-name
```

Run migrations:
```
npx sequelize-cli db:migrate
```

## Database

When running on your local machine, the `development` config is loaded from `./config/development.env` 
which will use SQLite.

If you want to use another database, for example PostgreSQL, look into `./config/production.env_EXAMPLE` 
and create a database and user in your PostgreSQL server:

```sql
CREATE DATABASE xi;
CREATE USER xi_usr WITH PASSWORD 't0p-s3cr3t';
GRANT ALL PRIVILEGES ON DATABASE xi TO xi_usr;
```

## License

[MIT licensed](LICENSE).

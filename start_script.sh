#!/bin/sh
echo "Waiting for database"
until nc -z mysql 3306; do
  sleep 1
done
npm run build
npm install -g ts-node tsconfig-paths
echo "run migrations"
# npx typeorm -d dist/config/database/orm.config.js migration:run
npm run typeorm migration:run
echo "run seeders"
# node dist/database/seeders/database.seeder.js
npm run seed:run
echo "Starting the app"
# For dev environmenr
# npm run start:dev
# for live environment
npm run start:prod
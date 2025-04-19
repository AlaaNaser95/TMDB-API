#!/bin/sh
echo "Waiting for database"
until nc -z mysql 3306; do
  sleep 1
done
npm install -g ts-node tsconfig-paths
echo "run migrations"
npx typeorm -d dist/config/database/orm.config.js migration:run
echo "run seeders"
node dist/database/seeders/database.seeder.js
echo "Starting the app"
exec node dist/main
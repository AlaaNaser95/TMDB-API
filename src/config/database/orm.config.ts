import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();
const env = process.env;

const ormConfig = new DataSource({
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE,
  entities: ['dist/database/entities/*.js'],
  synchronize: false,
  logging: false,
  migrationsTableName: 'migrations',
  migrations: ['dist/database/migrations/*.js'],
});

export default ormConfig;

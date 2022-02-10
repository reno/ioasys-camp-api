require('dotenv/config');

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: ['dist/shared/entities/**/*.entity.js'],
  migrations: ['infra/typeorm/migrations/*.ts'],
  cli: {
    entitiesDir: 'src/shared/entities/',
    migrationsDir: 'infra/typeorm/migrations',
  },
};

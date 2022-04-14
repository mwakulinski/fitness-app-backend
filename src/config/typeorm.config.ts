import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const typeOrmConfig = (isTest: boolean): PostgresConnectionOptions => {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    migrationsRun: true,
    database: isTest ? 'fitofit_test' : 'fitofit',
    entities: [isTest ? 'src/**/*.entity.ts' : 'dist/**/*.entity.js'],
    synchronize: false,
    migrations: [isTest ? 'src/migrations/*.ts' : 'dist/migrations/*js'],
    cli: {
      migrationsDir: isTest ? 'src/migrations/' : 'dist/migrations/',
    },
  };
};

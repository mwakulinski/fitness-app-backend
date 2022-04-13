import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const typeOrmConfig = (isTest: boolean): PostgresConnectionOptions => {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: isTest ? 'fitofit_test' : 'fitofit',
    entities: [isTest ? 'src/**/*.entity.ts' : 'dist/**/*.entity.js'],
    synchronize: false,
  };
};

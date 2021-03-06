import { Workout } from '../workouts/entity/Workout.entity';

module.exports = [
  {
    name: 'default', //for all environments
    type: 'postgres',
    url: process.env.DATABASE_URL,
    schema: 'public',
    // ssl: true,
    // extra: {
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // },
    synchronize: false,
    migrationsRun: false,

    logging: process.env.DATABASE_LOGGING === 'true',

    autoLoadEntities: true,

    entities: [Workout],
    migrationsTableName: 'migrations',
    migrations: ['dist/**/migrations/*.js'],
    cli: {
      migrationsDir: './src/migrations',
    },
  },
  {
    name: 'production', //for all environments
    type: 'postgres',
    url: process.env.DATABASE_URL,
    schema: 'public',
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    synchronize: false,
    migrationsRun: true,

    logging: process.env.DATABASE_LOGGING === 'true',

    autoLoadEntities: true,

    entities: [Workout],
    migrationsTableName: 'migrations',
    migrations: ['dist/**/migrations/*.js'],
    cli: {
      migrationsDir: './src/migrations',
    },
  },
  {
    name: 'test',
    type: 'postgres',
    schema: 'public',

    synchronize: false,
    migrationsRun: true,

    logging: process.env.DATABASE_LOGGING === 'true',

    autoLoadEntities: true,

    entities: ['./src/**/*.entity.ts'], // tests run on TS directly
    migrations: ['./src/**/migrations/*.ts'],
    migrationsTableName: 'migrations',

    cli: {
      migrationsDir: './src/migrations',
    },
  },
];

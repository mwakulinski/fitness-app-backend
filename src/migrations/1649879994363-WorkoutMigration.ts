import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class WorkoutMigration1649879994363 implements MigrationInterface {
  name = 'WorkoutMigration1649879994363';

  workoutTable = new Table({
    name: 'workouts',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'title',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'description',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'type',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'duration',
        type: 'int',
        isNullable: false,
      },
      {
        name: 'data',
        type: 'date',
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.workoutTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.workoutTable);
  }
}

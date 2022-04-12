import { IWorkout, IWorkoutsType } from 'src/interfaces/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Workout implements IWorkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: IWorkoutsType;

  @Column()
  duration: number;

  @Column()
  data: string;
}

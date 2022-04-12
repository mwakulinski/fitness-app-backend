import { IWorkout, IWorkoutsType } from 'src/interfaces/interfaces';

export class Workout implements IWorkout {
  id: number;
  title: string;
  description: string;
  type: IWorkoutsType;
  duration: number;
  data: string;
}

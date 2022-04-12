import { IWorkout } from 'src/interfaces/interfaces';

export class Workout implements IWorkout {
  id: number;
  title: string;
  description: string;
  duration: number;
  data: string;
}

import { ICreateWorkout, IWorkoutsType } from 'src/interfaces/interfaces';

export class CreateWorkoutDto implements ICreateWorkout {
  title: string;
  description: string;
  type: IWorkoutsType;
  duration: number;
  data: string;
}

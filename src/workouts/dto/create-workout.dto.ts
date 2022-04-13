import { IsString, MinLength } from 'class-validator';
import { ICreateWorkout, IWorkoutsType } from 'src/interfaces/interfaces';

export class CreateWorkoutDto implements ICreateWorkout {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(5)
  description: string;

  @IsString()
  @MinLength(5)
  type: IWorkoutsType;

  @IsString()
  @MinLength(5)
  duration: number;

  @IsString()
  @MinLength(5)
  data: string;
}

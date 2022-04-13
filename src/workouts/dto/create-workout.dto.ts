import { IsNumber, IsString, Min, MinLength } from 'class-validator';
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

  @IsNumber()
  @Min(1)
  duration: number;

  @IsString()
  @MinLength(5)
  data: string;
}

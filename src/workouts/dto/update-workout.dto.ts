import { IsOptional, IsString, Length, MinLength } from 'class-validator';
import { IUpdatedWorkout, IWorkoutsType } from 'src/interfaces/interfaces';

export class UpdateWorkoutDto implements IUpdatedWorkout {
  @IsString()
  @MinLength(5)
  @IsOptional()
  title?: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  description?: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  type?: IWorkoutsType;

  @IsString()
  @Length(10)
  @IsOptional()
  data?: string;
}

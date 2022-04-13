import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';
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

  @IsNumber()
  @Min(1)
  duration?: number;

  @IsString()
  @Length(10)
  @IsOptional()
  data?: string;
}

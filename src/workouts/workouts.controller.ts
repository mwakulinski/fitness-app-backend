import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get()
  getAll() {
    return this.workoutsService.getAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.workoutsService.findById(id);
  }

  @Patch(':id')
  updateWorkout(
    @Param(':id', ParseIntPipe) id: number,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    this.workoutsService.updateWorkout(id, updateWorkoutDto);
  }

  @Delete('id')
  deleteWorkout(@Param('id', ParseIntPipe) id: number) {
    this.workoutsService.deleteWorkout(id);
  }
}

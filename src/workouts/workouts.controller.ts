import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
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
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return this.workoutsService.updateWorkout(id, updateWorkoutDto);
  }

  @Delete(':id')
  deleteWorkout(@Param('id', ParseIntPipe) id: number) {
    return this.workoutsService.deleteWorkout(id);
  }

  @Post()
  addWorkout(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutsService.addWorkout(createWorkoutDto);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workout } from './entity/Workout.entity';
import { mockDataBase } from './mockDataBase/mockData';

@Injectable()
export class WorkoutsService {
  readonly workoutList: Workout[] = [...mockDataBase];

  getAll() {
    return this.workoutList;
  }

  findById(id: number) {
    return this.workoutList.find((workout) => workout.id === id);
  }

  updateWorkout(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    const userToUpdate = this.workoutList.find((workout) => workout.id === id);
    const updateWorkoutDtoKey = Object.keys(updateWorkoutDto);
    updateWorkoutDtoKey.forEach((key) => {
      userToUpdate[key] = updateWorkoutDto[key];
    });
  }

  addWorkout(createWorkoutDto: CreateWorkoutDto) {
    this.workoutList.push({ id: Math.random(), ...createWorkoutDto });
  }
}

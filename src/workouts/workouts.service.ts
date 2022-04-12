import { Injectable } from '@nestjs/common';
import { Workout } from './entity/Workout.entity';
import { mockDataBase } from './mockDataBase/mockData';

@Injectable()
export class WorkoutsService {
  private workoutList: Workout[] = mockDataBase;

  getAll() {
    return this.workoutList;
  }
}

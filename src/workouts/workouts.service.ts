import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workout } from './entity/Workout.entity';
import { mockDataBase } from './mockDataBase/mockData';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout) private workoutRepository: Repository<Workout>,
  ) {}
  public workoutList: Workout[] = [...mockDataBase];

  async getAll() {
    return await this.workoutRepository.find(); //SELECT * FROM WORKOUT
  }

  async findById(id: number) {
    try {
      const response = await this.workoutRepository.findOneOrFail(id); //SELECT * FROM workout WHERE ...
      return response;
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }

  async addWorkout(createWorkoutDto: CreateWorkoutDto) {
    try {
      const newWorkout = await this.workoutRepository.create({
        ...createWorkoutDto,
      });
      return await this.workoutRepository.save(newWorkout); //Insert or Update
    } catch (error) {
      throw error;
    }
  }

  async updateWorkout(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    const updateKeys = Object.keys(updateWorkoutDto);
    try {
      let workoutToUpdate = await this.findById(id);
      updateKeys.forEach((key) => {
        workoutToUpdate[key] = updateWorkoutDto[key];
      });
      return this.workoutRepository.save(workoutToUpdate);
    } catch (error) {
      throw error;
    }
  }

  async deleteWorkout(id: number) {
    try {
      const workoutToDelete = await this.findById(id);
      return await this.workoutRepository.remove(workoutToDelete);
    } catch (error) {
      throw error;
    }
  }
}

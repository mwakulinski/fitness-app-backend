import { Injectable } from '@nestjs/common';
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
    return await this.workoutRepository.find();
  }

  async findById(id: number) {
    try {
      const response = await this.workoutRepository.findOneOrFail(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async addWorkout(createWorkoutDto: CreateWorkoutDto) {
    try {
      const newWorkout = await this.workoutRepository.create({
        ...createWorkoutDto,
      });
      return this.workoutRepository.save(newWorkout); //Insert or Update
    } catch (error) {
      throw error;
    }
  }

  updateWorkout(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    const userToUpdate = this.workoutList.find((workout) => workout.id === id);
    const updateWorkoutDtoKey = Object.keys(updateWorkoutDto);
    updateWorkoutDtoKey.forEach((key) => {
      userToUpdate[key] = updateWorkoutDto[key];
    });
  }

  async deleteWorkout(id: number) {
    try {
      const workoutToDelete = await this.findById(id);
      return this.workoutRepository.remove(workoutToDelete);
    } catch (error) {
      throw error;
    }
  }
}

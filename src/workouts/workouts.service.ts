import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { formatInTimeZone } from 'date-fns-tz';
import { Repository } from 'typeorm';
import { DateHandlerService } from './date-handler/date-handler.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workout } from './entity/Workout.entity';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout) private workoutRepository: Repository<Workout>,
    private readonly dateHandlerService: DateHandlerService,
  ) {}

  async getAll(): Promise<Workout[]> {
    try {
      const workouts = await this.workoutRepository.find();
      this.dateHandlerService.handleDatesOutput(workouts);
      return workouts;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<Workout> {
    try {
      const workout = await this.workoutRepository.findOneOrFail(id);
      this.dateHandlerService.handleDateType(workout);
      return workout;
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }

  async addWorkout(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    try {
      const newWorkout = await this.workoutRepository.create({
        ...createWorkoutDto,
      });
      return await this.workoutRepository.save(newWorkout);
    } catch (error) {
      throw error;
    }
  }

  async updateWorkout(
    id: number,
    updateWorkoutDto: UpdateWorkoutDto,
  ): Promise<Workout> {
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

  async deleteWorkout(id: number): Promise<Workout> {
    try {
      const workoutToDelete = await this.findById(id);
      return await this.workoutRepository.remove(workoutToDelete);
    } catch (error) {
      throw error;
    }
  }

  async findBetweenDates(from: string, to: string) {
    try {
      return await this.workoutRepository.query(
        `SELECT * FROM workouts WHERE data BETWEEN '${from}' AND '${to}'`,
      );
    } catch (error) {
      throw error;
    }
  }
}

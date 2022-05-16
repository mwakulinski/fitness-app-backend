import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './entity/Workout.entity';
import { DateHandlerService } from './date-handler/date-handler.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workout])],
  providers: [WorkoutsService, DateHandlerService],
  controllers: [WorkoutsController],
})
export class WorkoutsModule {}

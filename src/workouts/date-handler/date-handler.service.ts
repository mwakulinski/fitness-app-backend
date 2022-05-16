import { Injectable } from '@nestjs/common';
import { formatInTimeZone } from 'date-fns-tz';
import { Workout } from '../entity/Workout.entity';

@Injectable()
export class DateHandlerService {
  handleDatesOutput(workouts: Workout[]) {
    workouts.forEach((workout) => {
      this.handleDateType(workout);
    });
  }

  handleDateType(workout: Workout) {
    workout.data = formatInTimeZone(
      workout.data,
      'Europe/Warsaw',
      'yyyy-MM-dd HH:mm:ssXXX',
    ).slice(0, 10);
  }
}

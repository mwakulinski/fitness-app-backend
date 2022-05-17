import { CreateWorkoutDto } from '../src/workouts/dto/create-workout.dto';

export const mockWorkoutDto: CreateWorkoutDto = {
  title: 'Szybkie Testowanie',
  description: 'Pisanie 200 stestów na godzinę',
  type: 'Cardio',
  duration: 60,
  data: '2022-04-12',
};
export const mockWorkoutDto2: CreateWorkoutDto = {
  title: 'Bieganie szybkie tempo',
  description: 'Bieganie 2 razy po 500m',
  type: 'Cardio',
  duration: 60,
  data: '2022-04-13',
};
export const mockWorkoutDto3: CreateWorkoutDto = {
  title: 'Szybkie Kodowanie',
  description: 'Pisanie 1000 linijek kodu z hackertyper',
  type: 'Cardio',
  duration: 60,
  data: '2022-04-15',
};

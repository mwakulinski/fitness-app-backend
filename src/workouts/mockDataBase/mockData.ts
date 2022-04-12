import { IWorkoutsType } from 'src/interfaces/interfaces';
import { Workout } from '../entity/Workout.entity';

export const mockDataBase: Workout[] = [
  {
    id: 1,
    title: 'Szybkie bieganie',
    description: '5 serii po 10 sekund sprintu x 3 serie',
    type: IWorkoutsType.running,
    duration: 15,
    data: '2022-04-05',
  },
  {
    id: 2,
    title: 'Wolne bieganie',
    description: '30 minut jogingu',
    type: IWorkoutsType.running,
    duration: 30,
    data: '2022-04-15',
  },
  {
    id: 3,
    title: 'Szybkie pływanie',
    description: '10 X 50 metrów x 3 serie',
    type: IWorkoutsType.cardio,
    duration: 45,
    data: '2022-04-11',
  },
  {
    id: 4,
    title: 'Wolne pływanie',
    description: '45 minut zmiennym spokojne tempo',
    type: IWorkoutsType.cardio,
    duration: 45,
    data: '2022-04-12',
  },
  {
    id: 5,
    title: 'Szybkie bieganie',
    description: '5 serii po 10 sekund sprintu x 3 serie',
    type: IWorkoutsType.running,
    duration: 15,
    data: '2022-04-11',
  },
];

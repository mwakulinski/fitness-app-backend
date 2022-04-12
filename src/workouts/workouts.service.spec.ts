import { Test, TestingModule } from '@nestjs/testing';
// import { IWorkoutsType } from 'src/interfaces/interfaces';
import { mockDataBase } from './mockDataBase/mockData';
import { WorkoutsService } from './workouts.service';

describe('WorkoutsService', () => {
  let service: WorkoutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutsService],
    }).compile();

    service = module.get<WorkoutsService>(WorkoutsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should display all workouts', () => {
    expect(service.getAll()).toEqual(mockDataBase);
  });

  it('should display one workout when given id of workout', () => {
    expect(service.findById(1)).toEqual({
      id: 1,
      title: 'Szybkie bieganie',
      description: '5 serii po 10 sekund sprintu x 3 serie',
      type: 'Running',
      duration: 15,
      data: '2022-04-05',
    });
  });

  it('should update one workout when given id of workout', () => {
    service.updateWorkout(1, {
      title: 'Bardzo szybkie bieganie',
      description: '5 serii po 5 sekund sprintu X 5 serii',
    });
    expect(service.findById(1)).toEqual({
      id: 1,
      title: 'Bardzo szybkie bieganie',
      description: '5 serii po 5 sekund sprintu X 5 serii',
      type: 'Running',
      duration: 15,
      data: '2022-04-05',
    });
  });
});

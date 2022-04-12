import { Test, TestingModule } from '@nestjs/testing';
import { mockDataBase } from './mockDataBase/mockData';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsModule } from './workouts.module';
import { WorkoutsService } from './workouts.service';

describe('WorkoutsController', () => {
  let controller: WorkoutsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WorkoutsModule],
    }).compile();

    controller = module.get<WorkoutsController>(WorkoutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should display all workouts', () => {
    expect(controller.getAll()).toEqual(mockDataBase);
  });

  it('should display one workout when given id of workout', () => {
    expect(controller.findById(1)).toEqual({
      id: 1,
      title: 'Szybkie bieganie',
      description: '5 serii po 10 sekund sprintu x 3 serie',
      type: 'Running',
      duration: 15,
      data: '2022-04-05',
    });
  });

  it('should update one workout when given id of workout', () => {
    controller.deleteWorkout(1);
    expect(controller.getAll()).toEqual(mockDataBase.slice(1));
  });

  it('should update one workout when given id of workout', () => {
    controller.updateWorkout(1, {
      title: 'Bardzo szybkie bieganie',
      description: '5 serii po 5 sekund sprintu X 5 serii',
    });
    expect(controller.findById(1)).toEqual({
      id: 1,
      title: 'Bardzo szybkie bieganie',
      description: '5 serii po 5 sekund sprintu X 5 serii',
      type: 'Running',
      duration: 15,
      data: '2022-04-05',
    });
  });
});

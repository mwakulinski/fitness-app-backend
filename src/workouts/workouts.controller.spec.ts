import { Test, TestingModule } from '@nestjs/testing';
import { mockDataBase } from './mockDataBase/mockData';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';

describe('WorkoutsController', () => {
  let controller: WorkoutsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsController],
      providers: [WorkoutsService],
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
});

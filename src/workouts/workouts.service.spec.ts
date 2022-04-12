import { Test, TestingModule } from '@nestjs/testing';
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
});

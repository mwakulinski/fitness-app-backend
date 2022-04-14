import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { Repository } from 'typeorm';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { Workout } from './entity/Workout.entity';
// import { IWorkoutsType } from 'src/interfaces/interfaces';
import { mockDataBase } from './mockDataBase/mockData';
import { WorkoutsService } from './workouts.service';

describe('WorkoutsService', () => {
  let service: WorkoutsService;
  let repo: Repository<Workout>;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'postgres',
          entities: ['dist/**/*.entity.js'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Workout]),
      ],
      providers: [WorkoutsService],
    }).compile();

    service = module.get<WorkoutsService>(WorkoutsService);
    repo = module.get<Repository<Workout>>(getRepositoryToken(Workout));
  });

  afterAll(async () => {
    module.close();
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

  it('should add new workout to the list', () => {
    const addedWorkout: CreateWorkoutDto = {
      title: 'Szybkie kodowanie',
      description: 'Pisanie 200 stestów na godzinę',
      type: 'Cardio',
      duration: 60,
      data: '2022-04-12',
    };
    service.addWorkout(addedWorkout);
    expect(service.getAll()).toEqual([
      ...mockDataBase,
      { id: expect.any(Number), ...addedWorkout },
    ]);
  });

  it('should delete workout by id when given id of workout', () => {
    service.deleteWorkout(1);
    expect(service.getAll()).toEqual(mockDataBase.slice(1));
  });
});

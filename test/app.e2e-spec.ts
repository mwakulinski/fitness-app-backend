import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  cleanupBeforeEachSpec,
  DatabaseCleaner,
} from './../src/databasecleaner/database-cleaner';
import { CreateWorkoutDto } from '../src/workouts/dto/create-workout.dto';
import { UpdateWorkoutDto } from '../src/workouts/dto/update-workout.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const mockWorkoutDto: CreateWorkoutDto = {
    title: 'Szybkie Testowanie',
    description: 'Pisanie 200 stestów na godzinę',
    type: 'Cardio',
    duration: 60,
    data: '2022-04-12',
  };
  const mockWorkoutDto2: CreateWorkoutDto = {
    title: 'Szybkie Testowanie',
    description: 'Pisanie 200 stestów na godzinę',
    type: 'Cardio',
    duration: 60,
    data: '2022-04-13',
  };
  const mockWorkoutDto3: CreateWorkoutDto = {
    title: 'Szybkie Testowanie',
    description: 'Pisanie 200 stestów na godzinę',
    type: 'Cardio',
    duration: 60,
    data: '2022-04-15',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  cleanupBeforeEachSpec();

  it('/workouts [Get]', async () => {
    return await request(app.getHttpServer())
      .get('/workouts')
      .expect(200)
      .expect([]);
  });

  describe('/workouts [Post]', () => {
    async function createWorkout() {
      await request(app.getHttpServer())
        .post('/workouts')
        .send(mockWorkoutDto)
        .expect(201);
    }

    it('returns workout table', async () => {
      await createWorkout();
      const { body: response } = await request(app.getHttpServer())
        .get('/workouts')
        .send();

      expect(response).toEqual([{ id: 1, ...mockWorkoutDto }]);
    });
  });

  describe('/workouts/[:id] [Delete]', () => {
    async function createWorkout() {
      await request(app.getHttpServer())
        .post('/workouts')
        .send(mockWorkoutDto)
        .expect(201);
    }

    async function deleteWorkout() {
      await request(app.getHttpServer())
        .delete('/workouts/1')
        .send()
        .expect(200);
    }

    it('returns workout table', async () => {
      await createWorkout();
      await deleteWorkout();
      const { body: response } = await request(app.getHttpServer())
        .get('/workouts')
        .send();

      expect(response).toEqual([]);
    });
  });

  describe('/workouts/find?from=&to= [Get]', () => {
    async function createWorkout(createWorkoutDto: CreateWorkoutDto) {
      await request(app.getHttpServer())
        .post('/workouts')
        .send(createWorkoutDto)
        .expect(201);
    }

    async function updateWorkout(updateWorkoutDto: UpdateWorkoutDto) {
      await request(app.getHttpServer())
        .post('/workouts')
        .send(updateWorkoutDto)
        .expect(201);
    }

    it('returns workout table', async () => {
      await createWorkout(mockWorkoutDto);
      await updateWorkout(mockWorkoutDto2);
      const { body: response } = await request(app.getHttpServer())
        .get('/workouts/find')
        .query({ from: '2022/04/10', to: '2022/04/12' })
        .send();

      expect(response).toEqual([
        {
          id: 1,
          title: 'Szybkie Testowanie',
          description: 'Pisanie 200 stestów na godzinę',
          type: 'Cardio',
          duration: 60,
          data: expect.any(String),
        },
      ]);
    });
  });

  describe('/workouts/find?from=&to= [Get]', () => {
    async function createWorkout(createWorkoutDto: CreateWorkoutDto) {
      await request(app.getHttpServer())
        .post('/workouts')
        .send(createWorkoutDto)
        .expect(201);
    }

    it('returns workout table', async () => {
      await createWorkout(mockWorkoutDto);
      await createWorkout(mockWorkoutDto2);
      await createWorkout(mockWorkoutDto3);
      const { body: response } = await request(app.getHttpServer())
        .get('/workouts/find')
        .query({ from: '2022/04/10', to: '2022/04/12' })
        .send();

      expect(response).toEqual([
        {
          id: 1,
          title: 'Szybkie Testowanie',
          description: 'Pisanie 200 stestów na godzinę',
          type: 'Cardio',
          duration: 60,
          data: expect.any(String),
        },
      ]);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

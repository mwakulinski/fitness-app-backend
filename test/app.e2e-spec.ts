import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { cleanupBeforeEachSpec } from './../src/databasecleaner/database-cleaner';
import { CreateWorkoutDto } from '../src/workouts/dto/create-workout.dto';
import { UpdateWorkoutDto } from '../src/workouts/dto/update-workout.dto';
import { mainConfig } from '../src/main.config';
import {
  mockWorkoutDto,
  mockWorkoutDto2,
  mockWorkoutDto3,
} from './mockWorkoutDto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  async function createWorkout(createWorkoutDto: CreateWorkoutDto) {
    await request(app.getHttpServer())
      .post('/workouts')
      .send(createWorkoutDto)
      .expect(201);
  }

  async function updateWorkout(updateWorkoutDto: UpdateWorkoutDto) {
    await request(app.getHttpServer())
      .patch('/workouts/1')
      .send(updateWorkoutDto)
      .expect(200);
  }

  async function deleteWorkout(id: number) {
    await request(app.getHttpServer())
      .delete(`/workouts/${id}`)
      .send()
      .expect(200);
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    mainConfig(app);
    await app.init();
  });

  cleanupBeforeEachSpec();

  describe("'/workouts [Get]", () => {
    it('returns empty array when no workouts added', async () => {
      return await request(app.getHttpServer())
        .get('/workouts')
        .expect(200)
        .expect([]);
    });
  });

  describe('/workouts [Post]', () => {
    it('returns workout table', async () => {
      await createWorkout(mockWorkoutDto);
      const { body: response } = await request(app.getHttpServer())
        .get('/workouts')
        .send();

      expect(response).toEqual([{ id: 1, ...mockWorkoutDto }]);
    });

    it('returns error when incorrect data send', async () => {
      const { body: response } = await request(app.getHttpServer())
        .post('/workouts')
        .send({
          title: 123,
          description: 'Bieganie 2 razy po 500m',
          type: 'Cardio',
          duration: 60,
          data: '2022-04-13',
        });

      expect(response).toEqual({
        error: 'Bad Request',
        message: [
          'title must be longer than or equal to 5 characters',
          'title must be a string',
        ],
        statusCode: 400,
      });
    });
  });

  describe('/workouts/[:id] [Delete]', () => {
    it('deletes workout from database', async () => {
      await createWorkout(mockWorkoutDto);
      await deleteWorkout(1);
      const { body: response } = await request(app.getHttpServer())
        .get('/workouts')
        .send();

      expect(response).toEqual([]);
    });
  });

  describe('/workouts/[:id] [Patch]', () => {
    it('updates workout table', async () => {
      await createWorkout(mockWorkoutDto);
      await updateWorkout(mockWorkoutDto2);
      const { body: response } = await request(app.getHttpServer())
        .get('/workouts/1')
        .send();

      expect(response).toEqual({
        id: 1,
        title: 'Bieganie szybkie tempo',
        description: 'Bieganie 2 razy po 500m',
        type: 'Cardio',
        duration: 60,
        data: expect.any(String),
      });
    });
  });

  describe('/workouts/find?from=&to= [Get]', () => {
    it('returns array of workouts within given range', async () => {
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

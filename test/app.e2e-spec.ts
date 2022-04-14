import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  cleanupBeforeEachSpec,
  DatabaseCleaner,
} from './../src/databasecleaner/database-cleaner';

describe('AppController (e2e)', () => {
  let app: INestApplication;

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
    async function createLog() {
      await request(app.getHttpServer())
        .post('/workouts')
        .send({
          title: 'Szybkie Testowanie',
          description: 'Pisanie 200 stestów na godzinę',
          type: 'Cardio',
          duration: 60,
          data: '2022-04-12',
        })
        .expect(201);
    }

    // it('returns workout table', async () => {
    //   await createLog();
    //   const { body: response } = await request(app.getHttpServer())
    //     .get('/workout')
    //     .send();

    //   expect(response).toEqual({
    //     items: [
    //       {
    //         id: 1,
    //         title: 'Szybkie Testowanie',
    //         description: 'Pisanie 200 stestów na godzinę',
    //         type: 'Cardio',
    //         duration: 60,
    //         data: '2022-04-12',
    //       },
    //     ],
    //   });
    // });
  });

  afterAll(async () => {
    await app.close();
  });
});

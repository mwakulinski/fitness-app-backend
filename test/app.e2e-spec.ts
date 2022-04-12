import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/workouts (GET)', () => {
    return request(app.getHttpServer())
      .get('/workouts')
      .expect(200)
      .expect([
        {
          id: 1,
          title: 'Szybkie bieganie',
          description: '5 serii po 10 sekund sprintu x 3 serie',
          type: 'Running',
          duration: 15,
          data: '2022-04-05',
        },
        {
          id: 2,
          title: 'Wolne bieganie',
          description: '30 minut jogingu',
          type: 'Running',
          duration: 30,
          data: '2022-04-15',
        },
        {
          id: 3,
          title: 'Szybkie pływanie',
          description: '10 X 50 metrów x 3 serie',
          type: 'Running',
          duration: 45,
          data: '2022-04-11',
        },
        {
          id: 4,
          title: 'Wolne pływanie',
          description: '45 minut zmiennym spokojne tempo',
          type: 'Running',
          duration: 45,
          data: '2022-04-12',
        },
        {
          id: 5,
          title: 'Szybkie bieganie',
          description: '5 serii po 10 sekund sprintu x 3 serie',
          type: 'Running',
          duration: 15,
          data: '2022-04-11',
        },
      ]);
  });

  it('/workouts/1 (GET)', () => {
    return request(app.getHttpServer()).get('/workouts/1').expect(200).expect({
      id: 1,
      title: 'Szybkie bieganie',
      description: '5 serii po 10 sekund sprintu x 3 serie',
      type: 'Running',
      duration: 15,
      data: '2022-04-05',
    });
  });

  it('/workouts/1 (Delete)', () => {
    return request(app.getHttpServer())
      .delete('/workouts/1')
      .expect(200)
      .expect({});
  });
});

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

const { version } = require('../../../package.json');

describe('HealthController test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET healthCheck with 200 ok', async () => request(app.getHttpServer())
      .get(`/health`)
      .expect(200)
      .expect((response) => {
        expect(response.body.status).toBe('UP');
      }));

  it('/GET healthCheckVersion with 200 ok', async () => request(app.getHttpServer())
      .get(`/health/version`)
      .expect(200)
      .expect((response) => {
        expect(response.body.name).toBe('kick-off-backend');
        expect(response.body.version).toBe(version);
      }));
});

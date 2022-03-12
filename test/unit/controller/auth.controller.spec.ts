import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthService } from '../../../src/services/auth.service';
import { AppModule } from '../../../src/app.module';
import MockData from '../../mock/user.mock';

describe('UserController test', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    authService = await moduleRef.resolve(AuthService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/POST registerUser of a startup with 201 ok', async () => {
    authService.registerUser = jest.fn().mockResolvedValueOnce({ uuid: MockData.userStartupCreatedResponse.uuid });

    return request(app.getHttpServer())
      .post(`/auth/register`)
      .send(MockData.userToCreateStartup)
      .expect(201)
      .expect((response) => {
        expect(response.body.uuid).not.toBeNull();
        expect(response.body.uuid).toBe(MockData.userStartupCreatedResponse.uuid);
      });
  });

  it('/POST loginUser of a startup with 201 ok', async () => {
    authService.login = jest.fn().mockResolvedValueOnce({ uuid: MockData.userStartupCreatedResponse.uuid });

    return request(app.getHttpServer())
      .post(`/auth/login`)
      .send({
        email: 'teste@email.com',
        password: 'senha123'
      })
      .expect(201)
      .expect((response) => {
        expect(response.body.uuid).not.toBeNull();
        expect(response.body.uuid).toBe(MockData.userStartupCreatedResponse.uuid);
      });
  });
});

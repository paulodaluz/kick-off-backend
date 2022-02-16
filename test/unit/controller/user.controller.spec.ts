import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UserService } from '../../../src/services/user.service';
import { AppModule } from '../../../src/app.module';
import MockData from '../../mock/user.mock';

describe('UserController test', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    userService = await moduleRef.resolve(UserService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/POST registerUser of a startup with 201 ok', async () => {
    userService.registerUser = jest.fn().mockResolvedValueOnce({ uuid: MockData.userStartupCreatedResponse.uuid });

    return request(app.getHttpServer())
      .post(`/user/register`)
      .send(MockData.userToCreateStartup)
      .expect(201)
      .expect((response) => {
        expect(typeof response.body.uuid).toBe('string');
        expect(response.body.uuid).toBe(MockData.userStartupCreatedResponse.uuid);
      });
  });

  it('/POST loginUser of a startup with 201 ok', async () => {
    userService.login = jest.fn().mockResolvedValueOnce({ uuid: MockData.userStartupCreatedResponse.uuid });

    return request(app.getHttpServer())
      .post(`/user/login`)
      .send({
        email: 'teste@email.com',
        password: 'senha123'
      })
      .expect(201)
      .expect((response) => {
        expect(typeof response.body.uuid).toBe('string');
        expect(response.body.uuid).toBe(MockData.userStartupCreatedResponse.uuid);
      });
  });

  it('/GET getUserInfos of a startup with 200 ok', async () => {
    userService.getUserInfos = jest.fn().mockResolvedValueOnce(MockData.userStartupCreatedResponse);

    return request(app.getHttpServer())
      .get(`/user/get-infos/${MockData.userStartupCreated.uuid}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.password).toBe(undefined);
        expect(response.body.uuid).toBe("10611d0d-93d3-414f-8a39-af350f54315f");
        expect(response.body.name).toBe("Carlos Gas");
        expect(response.body.managingPartners).toBe("Paulo da Luz e Leonardo");
        expect(response.body.numberOfWorkers).toBe(33);
        expect(response.body.typeOfUser).toBe("startup");
        expect(response.body.phoneNumber).toBe("(54) 99108-3039");
        expect(response.body.cnpj).toBe("98.828.768/0001-52");
      });
  });

  it('/PUT updateUser 200 ok', async () => {
    userService.updateUser = jest.fn().mockImplementation();

    return request(app.getHttpServer())
      .put(`/user/update-info/${MockData.userStartupCreated.uuid}`)
      .set('Content-type', 'application/json')
      .send(MockData.userStartupCreated)
      .expect(200);
  });

  it('/DELETE deleteUser 200 ok', async () => {
    userService.deleteUser = jest.fn().mockImplementation();

    return request(app.getHttpServer()).delete(`/user/delete-infos/${MockData.userStartupCreated.uuid}`).expect(200);
  });
});
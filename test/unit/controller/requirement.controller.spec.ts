import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import MockData from '../../mock/requirement.mock';
import { RequirementService } from '../../../src/services/requirement.service';
import requirementMock from '../../mock/requirement.mock';
const jwt = require('jsonwebtoken');

describe('UserController test', () => {
  let app: INestApplication;
  let requirementService: RequirementService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    requirementService = await moduleRef.resolve(RequirementService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/POST registerRequirement with 201 ok', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValueOnce({} as any);
    requirementService.registerRequirement = jest.fn().mockImplementation();

    return request(app.getHttpServer())
      .post(`/requirement/register`)
      .send(MockData.developerRequirement)
      .expect(201)
  });

  it('/POST getRequirementsByUser with 200 ok', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValueOnce({} as any);
    requirementService.getRequirementsByUuid = jest.fn().mockResolvedValue([requirementMock.developerRequirement]);

    return request(app.getHttpServer())
      .post(`/requirement/get-infos`)
      .send([requirementMock.developerRequirement.uuid])
      .expect(201)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBe(1)
        expect(response.body).toStrictEqual([requirementMock.developerRequirement])
      })
  });

  it('/POST getRequirementsOpened with 200 ok', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValueOnce({} as any);
    requirementService.getRequirementsByType = jest.fn().mockResolvedValue([requirementMock.developerRequirement]);

    return request(app.getHttpServer())
      .get(`/requirement/active-requirements`)
      .set({typeOfRequirement: 'development'})
      .expect(200)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBe(1)
        expect(response.body).toStrictEqual([requirementMock.developerRequirement])
      })
  });

  it('/PATCH deletarRequerimento with 200 ok', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValueOnce({} as any);

    return request(app.getHttpServer())
      .patch(`/requirement/add-investment/XXX`)
      .expect(200)
  });

  it('/PUT updateRequirements with 200 ok', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValueOnce({} as any);
    requirementService.updateRequirement = jest.fn().mockImplementation();

    return request(app.getHttpServer())
      .put(`/requirement/update-info/requirement/XXX`)
      .send(MockData.developerRequirement)
      .expect(200)
  });

  it('/DELETE deletarRequerimento with 201 ok', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValueOnce({} as any);
    requirementService.deleteRequirement = jest.fn().mockImplementation();

    return request(app.getHttpServer())
      .delete(`/requirement/delete-infos/requirement/xxxx/startup/xxx`)
      .expect(200)
  });
});

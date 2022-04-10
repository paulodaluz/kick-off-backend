import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import MockData from '../../mock/requirement.mock';
import { RequirementService } from '../../../src/services/requirement.service';

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
      .expect(201);
  });

  it('/POST getRequirementsByUser with 200 ok', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValueOnce({} as any);
    requirementService.getRequirementsByUuid = jest
      .fn()
      .mockResolvedValue([MockData.developerRequirement]);

    return request(app.getHttpServer())
      .post(`/requirement/get-infos`)
      .send([MockData.developerRequirement.uuid])
      .expect(201)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(1);
        expect(response.body).toStrictEqual([MockData.developerRequirement]);
      });
  });

  it('/POST getRequirementsOpened with 200 ok', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValueOnce({} as any);
    requirementService.getRequirementsByType = jest
      .fn()
      .mockResolvedValue([MockData.developerRequirement]);

    return request(app.getHttpServer())
      .get(`/requirement/active-requirements`)
      .set({ typeOfRequirement: 'development' })
      .expect(200)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(1);
        expect(response.body).toStrictEqual([MockData.developerRequirement]);
      });
  });

  it('/POST should link requirement with a dev or investor and return status 200 ok', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValueOnce({} as any);
    requirementService.linkRequirementToCustomer = jest.fn().mockImplementation();

    return request(app.getHttpServer())
      .post('/requirement/link-requirement-to-customer')
      .set('Content-type', 'application/json')
      .send({
        uuidByCustomer: '472aa7b9-3e0a-469d-b762-845d9ddf981a',
        uuidByRequirement: '472aa7b9-3e0a-469d-b762-845d9ddf981g',
        uuidByStartupProprietress: '472aa7b9-3e0a-469d-b762-845d9ddf982o',
      })
      .expect(201);
  });

  it('/POST should accept a link requirement with a dev or investor and return status 200 ok', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValueOnce({} as any);
    requirementService.assessCustomerInteraction = jest.fn().mockImplementation();

    return request(app.getHttpServer())
      .post('/requirement/assess-customer-interaction')
      .set('Content-type', 'application/json')
      .send({
        uuidByCustomer: '472aa7b9-3e0a-469d-b762-845d9ddf981f',
        uuidByRequirement: '472aa7b9-3e0a-469d-b762-845d9ddf981x',
        uuidByStartupProprietress: '472aa7b9-3e0a-469d-b762-845d9ddf981d',
        notificationId: '472aa7b9-3e0a-469d-b762-845d9ddf98xx',
        interactionStatus: 'accept',
      })
      .expect(201);
  });

  it('/PUT updateRequirements with 200 ok', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValueOnce({} as any);
    requirementService.updateRequirement = jest.fn().mockImplementation();

    return request(app.getHttpServer())
      .put(`/requirement/update-info/requirement/XXX`)
      .send(MockData.developerRequirement)
      .expect(200);
  });

  it('/DELETE deletarRequerimento with 201 ok', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValueOnce({} as any);
    requirementService.deleteRequirement = jest.fn().mockImplementation();

    return request(app.getHttpServer())
      .delete(`/requirement/delete-infos/requirement/xxxx/startup/xxx`)
      .expect(200);
  });
});

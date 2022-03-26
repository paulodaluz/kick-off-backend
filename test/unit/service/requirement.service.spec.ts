import { RequirementRepository } from '../../../src/repository/requeriment.repository';
import { RequirementService } from '../../../src/services/requirement.service';
import { UserRepository } from '../../../src/repository/user.repository';
import Mock from '../../mock/requirement.mock';
import { Requirement } from '../../../src/interfaces/requirement.interface';

const requirementRepository = new RequirementRepository();
const userRepository = new UserRepository();
const requirementService = new RequirementService(requirementRepository, userRepository);

describe('RequirementService test', () => {
  beforeEach(async () => {
    jest.fn().mockClear();
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should return success by service RequirementService on operation registerRequirement', async () => {
    requirementRepository.registerRequirement = jest.fn().mockImplementation();
    userRepository.getUserByUuid = jest.fn().mockResolvedValue(Mock.userStartup);
    userRepository.updateUserInfo = jest.fn().mockImplementation();

    await requirementService.registerRequirement(
      Mock.userStartup.uuid,
      Mock.developerRequirement as Requirement,
    );

    const spyRegisterReq = jest
      .spyOn(requirementRepository, 'registerRequirement')
      .mockReturnValueOnce({} as any);

    const spyUpdateUserReqs = jest
      .spyOn(userRepository, 'updateUserInfo')
      .mockReturnValueOnce({} as any);

    expect(spyRegisterReq).toHaveBeenCalledTimes(1);
    expect(spyUpdateUserReqs).toHaveBeenCalledTimes(1);
  });

  it('should return success by service RequirementService on operation registerRequirement', async () => {
    requirementRepository.registerRequirement = jest.fn().mockImplementation();
    userRepository.getUserByUuid = jest.fn().mockResolvedValue(Mock.userStartup);
    userRepository.updateUserInfo = jest.fn().mockImplementation();

    await requirementService.registerRequirement(
      Mock.userStartup.uuid,
      Mock.inevestmentRequirement as Requirement,
    );

    const spyRegisterReq = jest
      .spyOn(requirementRepository, 'registerRequirement')
      .mockReturnValueOnce({} as any);

    const spyUpdateUserReqs = jest
      .spyOn(userRepository, 'updateUserInfo')
      .mockReturnValueOnce({} as any);

    expect(spyRegisterReq).toHaveBeenCalledTimes(1);
    expect(spyUpdateUserReqs).toHaveBeenCalledTimes(1);
  });

  it('should return error on operation registerRequirement(404)', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValue(null);

    try {
      await requirementService.registerRequirement('xxx', Mock.developerRequirement as Requirement);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe('The specified resource is not found.');
    }
  });

  it('should return success by service RequirementService on operation getRequirementsByUuid', async () => {
    requirementRepository.getRequirementByUuid = jest
      .fn()
      .mockResolvedValue(Mock.developerRequirement);

    const resonse = await requirementService.getRequirementsByUuid([
      Mock.developerRequirement.uuid,
    ]);

    expect(typeof resonse[0].uuid).toBe('string');
    expect(resonse[0].description).toBe('Desenvolver um aplicativo mobile com firebase');
    expect(resonse[0].languagesOfDevelop).toBe('NodeJS e React Native');
    expect(resonse[0].payment).toBe(5000);
    expect(resonse[0].typeOfRequirement).toBe('development');
    expect(resonse[0].status).toBe('opened');
  });

  it('should return error on operation getRequirementsByUuid(400)', async () => {
    requirementRepository.getRequirementByUuid = jest.fn().mockResolvedValue(null);

    try {
      await requirementService.getRequirementsByUuid([Mock.developerRequirement.uuid]);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return error on operation getRequirementsByType(400)', async () => {
    try {
      await requirementService.getRequirementsByType('xxx' as any);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return success by service RequirementService on operation getRequirementsByType', async () => {
    requirementRepository.getRequirementByType = jest
      .fn()
      .mockResolvedValue([Mock.developerRequirement]);

    const resonse = await requirementService.getRequirementsByType('development');

    expect(typeof resonse[0].uuid).toBe('string');
    expect(resonse[0].description).toBe('Desenvolver um aplicativo mobile com firebase');
    expect(resonse[0].languagesOfDevelop).toBe('NodeJS e React Native');
    expect(resonse[0].payment).toBe(5000);
    expect(resonse[0].typeOfRequirement).toBe('development');
  });

  it('should return error on operation updateRequirement(404)', async () => {
    requirementRepository.getRequirementByUuid = jest.fn().mockResolvedValue(null);

    try {
      await requirementService.updateRequirement('xxx', Mock.developerRequirement as Requirement);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe('The specified resource is not found.');
    }
  });

  it('should return error on operation updateRequirement(404) because requirement not exists', async () => {
    requirementRepository.getRequirementByUuid = jest.fn().mockResolvedValue({});

    try {
      await requirementService.updateRequirement('xxx', Mock.developerRequirement as Requirement);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe('The specified resource is not found.');
    }
  });

  it(`should return error on operation updateRequirement(403)
      because requirement aleary received investment`, async () => {
    requirementRepository.getRequirementByUuid = jest
      .fn()
      .mockResolvedValue(Mock.inevestmentRequirementWithInvest);

    try {
      await requirementService.updateRequirement(
        'xxx',
        Mock.inevestmentRequirementWithInvest as Requirement,
      );
    } catch (error) {
      expect(error.status).toBe(403);
      expect(error.message).toBe('Client does not have permission.');
    }
  });

  it('should return error on operation updateRequirement(400) because dont have things to update', async () => {
    requirementRepository.getRequirementByUuid = jest
      .fn()
      .mockResolvedValue(Mock.inevestmentRequirementWithInvest);

    try {
      await requirementService.updateRequirement('xxx', {});
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return success by service RequirementService on operation updateRequirement', async () => {
    requirementRepository.getRequirementByUuid = jest
      .fn()
      .mockResolvedValue(Mock.inevestmentRequirementTwo);
    requirementRepository.updateRequirementInfo = jest.fn().mockImplementation();

    await requirementService.updateRequirement(
      Mock.inevestmentRequirementTwo.uuid,
      Mock.inevestmentRequirementTwo as Requirement,
    );

    const spyUpdateReq = jest
      .spyOn(requirementRepository, 'updateRequirementInfo')
      .mockReturnValueOnce({} as any);

    expect(spyUpdateReq).toHaveBeenCalledTimes(1);
  });

  it('should return success on operation deleteRequirement to developerRequirement', async () => {
    requirementRepository.getRequirementByUuid = jest
      .fn()
      .mockResolvedValue(Mock.developerRequirement);
    userRepository.getUserByUuid = jest.fn().mockResolvedValue(Mock.userStartup);
    userRepository.updateUserInfo = jest.fn().mockImplementation();
    requirementRepository.deleteRequirementByUuid = jest.fn().mockImplementation();

    const spyUpdateUser = jest
      .spyOn(userRepository, 'updateUserInfo')
      .mockReturnValueOnce({} as any);

    const spyDeleteReq = jest
      .spyOn(requirementRepository, 'deleteRequirementByUuid')
      .mockReturnValueOnce({} as any);

    await requirementService.deleteRequirement(
      Mock.developerRequirement.uuid,
      Mock.userStartup.uuid,
    );

    expect(spyUpdateUser).toHaveBeenCalledTimes(1);
    expect(spyDeleteReq).toHaveBeenCalledTimes(1);
  });

  it('should return success on operation deleteRequirement to InvestmentRequirement', async () => {
    requirementRepository.getRequirementByUuid = jest
      .fn()
      .mockResolvedValue(Mock.inevestmentRequirement);
    userRepository.getUserByUuid = jest.fn().mockResolvedValue(Mock.userStartup);
    userRepository.updateUserInfo = jest.fn().mockImplementation();
    requirementRepository.deleteRequirementByUuid = jest.fn().mockImplementation();

    const spyUpdateUser = jest
      .spyOn(userRepository, 'updateUserInfo')
      .mockReturnValueOnce({} as any);

    const spyDeleteReq = jest
      .spyOn(requirementRepository, 'deleteRequirementByUuid')
      .mockReturnValueOnce({} as any);

    await requirementService.deleteRequirement(
      Mock.inevestmentRequirement.uuid,
      Mock.userStartup.uuid,
    );

    expect(spyUpdateUser).toHaveBeenCalledTimes(1);
    expect(spyDeleteReq).toHaveBeenCalledTimes(1);
  });

  it('should return error on operation deleteRequirement(404)', async () => {
    requirementRepository.getRequirementByUuid = jest.fn().mockResolvedValue(null);
    userRepository.getUserByUuid = jest.fn().mockResolvedValue(null);

    try {
      await requirementService.deleteRequirement('xxxx', 'xxxxx');
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe('The specified resource is not found.');
    }
  });

  it('should return error on operation deleteRequirement to investor(403)', async () => {
    const investorModified = Mock.inevestmentRequirement;
    investorModified.obtainedMoney = 1000;

    requirementRepository.getRequirementByUuid = jest.fn().mockResolvedValue(investorModified);
    userRepository.getUserByUuid = jest.fn().mockResolvedValue(Mock.userStartup);
    userRepository.updateUserInfo = jest.fn().mockImplementation();
    requirementRepository.deleteRequirementByUuid = jest.fn().mockImplementation();

    try {
      await requirementService.deleteRequirement('xxxx', 'xxxxx');
    } catch (error) {
      expect(error.status).toBe(403);
      expect(error.message).toBe('Client does not have permission.');
    }
  });

  it('should return error on operation deleteRequirement to developer(403) because is concluded', async () => {
    const investorModified = Mock.inevestmentRequirement;
    investorModified.status = 'concluded';

    requirementRepository.getRequirementByUuid = jest.fn().mockResolvedValue(investorModified);
    userRepository.getUserByUuid = jest.fn().mockResolvedValue(Mock.userStartup);
    userRepository.updateUserInfo = jest.fn().mockImplementation();
    requirementRepository.deleteRequirementByUuid = jest.fn().mockImplementation();

    try {
      await requirementService.deleteRequirement('xxxx', 'xxxxx');
    } catch (error) {
      expect(error.status).toBe(403);
      expect(error.message).toBe('Client does not have permission.');
    }
  });
});

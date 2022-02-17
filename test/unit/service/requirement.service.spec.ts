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

    await requirementService.registerRequirement(Mock.userStartup.uuid, Mock.developerRequirement as Requirement);

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

  it('should return success on operation deleteRequirement to developerRequirement', async () => {
    requirementRepository.getRequirementByUuid = jest.fn().mockResolvedValue(Mock.developerRequirement);
    userRepository.getUserByUuid = jest.fn().mockResolvedValue(Mock.userStartup);
    userRepository.updateUserInfo = jest.fn().mockImplementation();
    requirementRepository.deleteRequirementByUuid = jest.fn().mockImplementation();

    const spyUpdateUser = jest
      .spyOn(userRepository, 'updateUserInfo')
      .mockReturnValueOnce({} as any);

    const spyDeleteReq = jest
      .spyOn(requirementRepository, 'deleteRequirementByUuid')
      .mockReturnValueOnce({} as any);

    await requirementService.deleteRequirement(Mock.developerRequirement.uuid, Mock.userStartup.uuid);

    expect(spyUpdateUser).toHaveBeenCalledTimes(1);
    expect(spyDeleteReq).toHaveBeenCalledTimes(1);
  });

  it('should return success on operation deleteRequirement to InvestmentRequirement', async () => {
    requirementRepository.getRequirementByUuid = jest.fn().mockResolvedValue(Mock.inevestmentRequirement);
    userRepository.getUserByUuid = jest.fn().mockResolvedValue(Mock.userStartup);
    userRepository.updateUserInfo = jest.fn().mockImplementation();
    requirementRepository.deleteRequirementByUuid = jest.fn().mockImplementation();

    const spyUpdateUser = jest
      .spyOn(userRepository, 'updateUserInfo')
      .mockReturnValueOnce({} as any);

    const spyDeleteReq = jest
      .spyOn(requirementRepository, 'deleteRequirementByUuid')
      .mockReturnValueOnce({} as any);

    await requirementService.deleteRequirement(Mock.inevestmentRequirement.uuid, Mock.userStartup.uuid);

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
});

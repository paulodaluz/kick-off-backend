import { User } from '../../../src/interfaces/user.interface';
import { UserRepository } from '../../../src/repository/user.repository';
import { RequirementRepository } from '../../../src/repository/requeriment.repository';
import { UserService } from '../../../src/services/user.service';
import mock from '../../mock/user.mock';

const userRepository = new UserRepository();
const requirementRepository = new RequirementRepository();
const userService = new UserService(userRepository, requirementRepository);

describe('UserService test', () => {
  beforeEach(async () => {
    jest.fn().mockClear();
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should return success on operation getUserInfos', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValueOnce(mock.userStartupCreated);

    const result = await userService.getUserInfos(mock.userStartupCreated.uuid);

    expect(result).toBe(mock.userStartupCreated);
    expect(result.password).toBe(undefined);
    expect(result.uuid).toBe('10611d0d-93d3-414f-8a39-af350f54315f');
    expect(result.name).toBe('Carlos Gas');
    expect(result.managingPartners).toBe('Paulo da Luz e Leonardo');
    expect(result.numberOfWorkers).toBe(33);
    expect(result.typeOfUser).toBe('startup');
    expect(result.phoneNumber).toBe('(54) 99108-3039');
    expect(result.cnpj).toBe('98.828.768/0001-52');
  });

  it('should return success on operation getUserInfos with requirements details', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValueOnce(mock.completeUserStartup);
    requirementRepository.getRequirementByUuid = jest
      .fn()
      .mockResolvedValueOnce(mock.devRequirement)
      .mockResolvedValueOnce(mock.investRequirementOne)
      .mockResolvedValueOnce(mock.investRequirementTwo);

    const result = await userService.getUserInfos(mock.completeUserStartup.uuid);

    expect(result.password).toBe(undefined);
    expect(result.uuid).toBe('10611d0d-93d3-414f-8a39-af350f54315f');
    expect(result.name).toBe('Startup Name');
    expect(result.email).toBe('email@gmail.com');
    expect(result.managingPartners).toBe('Paulo da Luz e Leonardo');
    expect(result.numberOfWorkers).toBe(33);
    expect(result.typeOfUser).toBe('startup');
    expect(result.developerRequirements).toBe(undefined);
    expect(result.investmentRequirements).toBe(undefined);
    expect(result.requirements.length).toBe(3);
    expect(result.requirements[0].creationDate).toBe(
      'Fri Feb 21 2022 00:05:07 GMT-0300 (Horário Padrão de Brasília)',
    );
    expect(result.requirements[1].creationDate).toBe(
      'Fri Feb 22 2022 00:05:07 GMT-0300 (Horário Padrão de Brasília)',
    );
    expect(result.requirements[2].creationDate).toBe(
      'Fri Feb 23 2022 00:05:07 GMT-0300 (Horário Padrão de Brasília)',
    );
    expect(result.requirements[1].partnerParticipation).toBe('5,2%');
    expect(result.phoneNumber).toBe('(54) 99108-3039');
    expect(result.cnpj).toBe('98.828.768/0001-52');
    expect(result.investmentRaised).toBe(45000);
    expect(result.description).toBe('A good startup');
  });

  it('should return error User not found, on operation getUserInfos', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValueOnce(null);

    try {
      await userService.getUserInfos(mock.userStartupCreated.uuid);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response).toBe('The specified resource is not found.');
    }
  });

  it('should return success by service UserService on operation updateUser', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValueOnce(mock.userStartupCreatedTwo);
    userRepository.updateUserInfo = jest.fn().mockImplementation();

    const spy = jest.spyOn(userRepository, 'updateUserInfo').mockReturnValueOnce({} as any);

    await userService.updateUser(
      '10611d0d-93d3-414f-8a39-af350f54315f',
      mock.userStartupCreated as User,
    );

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return success by service UserService on update password', async () => {
    userRepository.getUserByUuid = jest
      .fn()
      .mockResolvedValueOnce(mock.userStartupCreatedToUpdatePassword);
    userRepository.updateUserInfo = jest.fn().mockImplementation();

    const spy = jest.spyOn(userRepository, 'updateUserInfo').mockReturnValueOnce({} as any);

    await userService.updateUser('10611d0d-93d3-414f-8a39-af350f54315f', {
      oldPassword: '135791',
      newPassword: 'senha1234',
    } as User);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return error on update user', async () => {
    userRepository.getUserByUuid = jest
      .fn()
      .mockResolvedValueOnce(mock.userStartupCreatedToUpdatePassword);

    try {
      await userService.updateUser('10611d0d-93d3-414f-8a39-af350f54315f', {
        oldPassword: 'xxxx',
        newPassword: 'senha1234',
      } as User);
    } catch (error) {
      expect(error.status).toBe(403);
      expect(error.response).toBe('Client does not have permission.');
    }
  });

  it('should return error User not found, on operation updateUser', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValueOnce(null);

    try {
      await userService.updateUser(
        mock.userStartupCreatedResponse.uuid,
        mock.userStartupCreatedResponse as User,
      );
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response).toBe('The specified resource is not found.');
    }
  });

  it('should return error no information to update, on operation updateUser', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValueOnce(mock.userStartupCreatedResponse);

    try {
      await userService.updateUser(mock.userStartupCreatedResponse.uuid, {} as User);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return success on operation deleteUser', async () => {
    userRepository.deleteUserByUuid = jest.fn().mockImplementation();

    const spy = jest.spyOn(userRepository, 'deleteUserByUuid').mockReturnValueOnce({} as any);

    await userService.deleteUser(mock.userStartupCreatedResponse.uuid);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

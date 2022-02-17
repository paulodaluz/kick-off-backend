import { User } from '../../../src/interfaces/user.interface';
import { UserRepository } from '../../../src/repository/user.repository';
import { UserService } from '../../../src/services/user.service';
import mock from '../../mock/user.mock';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

describe('UserService test', () => {
  beforeAll(async () => {
    jest.fn().mockClear();
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should return success on operation getUserInfos', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValueOnce(mock.userStartupCreated);

    const result = await userService.getUserInfos(mock.userStartupCreated.uuid);

    expect(result).toBe(mock.userStartupCreated);
    expect(result.password).toBe(undefined);
    expect(result.uuid).toBe("10611d0d-93d3-414f-8a39-af350f54315f");
    expect(result.name).toBe("Carlos Gas");
    expect(result.managingPartners).toBe("Paulo da Luz e Leonardo");
    expect(result.numberOfWorkers).toBe(33);
    expect(result.typeOfUser).toBe("startup");
    expect(result.phoneNumber).toBe("(54) 99108-3039");
    expect(result.cnpj).toBe("98.828.768/0001-52");
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
    userRepository.getUserByUuid = jest.fn().mockResolvedValueOnce(mock.userStartupCreated);
    userRepository.updateUserInfo = jest.fn().mockImplementation();

    const spy = jest
      .spyOn(userRepository, 'updateUserInfo')
      .mockReturnValueOnce({} as any);

    await userService.updateUser(mock.userStartupCreated.uuid, mock.userStartupCreated as User);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return error User not found, on operation updateUser', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValueOnce(null);

    try {
      await userService.updateUser(mock.userStartupCreatedResponse.uuid, mock.userStartupCreatedResponse as User);
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
      expect(error.response).toBe('Client specified an invalid argument, request body or query param.');
    }
  });

  it('should return success on operation deleteUser', async () => {
    userRepository.deleteUserByUuid = jest.fn().mockImplementation();

    const spy = jest
      .spyOn(userRepository, 'deleteUserByUuid')
      .mockReturnValueOnce({} as any);

    await userService.deleteUser(mock.userStartupCreatedResponse.uuid);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

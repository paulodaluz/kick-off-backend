import { User } from '../../../src/interfaces/user.interface';
import { UserRepository } from '../../../src/repository/user.repository';
import { UserService } from '../../../src/services/user.service';
import mock from '../../mock/user.mock';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

describe('UserService test', () => {
  beforeAll(async () => {
    jest.fn().mockClear();
  });

  it('should return success by service UserService on operation registerUser', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValue(null);
    userRepository.registerUser = jest.fn().mockImplementation();

    const result = await userService.registerUser(mock.userToCreate as User);

    expect(typeof result.uuid).toBe('string');
  });

  it('should return error on CNPJ validation, on operation registerUser', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValueOnce(null);

    const user = mock.userToCreate;
    user.cnpj = 'xxxx';

    try {
      await userService.registerUser(user as User);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return error User already exists, on operation registerUser', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValueOnce(mock.userCreated);

    try {
      await userService.registerUser(mock.userToCreate as User);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return success by service UserService on operation login', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValueOnce(mock.userCreated);

    const result = await userService.login(mock.userToCreate as User);

    expect(result.uuid).toBe(mock.userCreated.uuid);
  });

  it('should return error not found, on operation login', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValueOnce(null);

    try {
      await userService.login({email: mock.userToCreate.email, password: mock.userToCreate.password});
    } catch (error) {
      expect(error.status).toBe(403);
      expect(error.response).toBe('Client does not have permission.');
    }
  });

  it('should return success on operation getUserInfos', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValueOnce(mock.userCreated);

    const result = await userService.getUserInfos(mock.userCreated.uuid);

    expect(result).toBe(mock.userCreated);
    expect(result.password).toBe(undefined);
  });

  it('should return error User not found, on operation getUserInfos', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValueOnce(null);

    try {
      await userService.getUserInfos(mock.userCreated.uuid);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response).toBe('The specified resource is not found.');
    }
  });

  it('should return success by service UserService on operation updateUser', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValueOnce(mock.userCreated);
    userRepository.updateUserInfo = jest.fn().mockImplementation();

    const spy = jest
      .spyOn(userRepository, 'updateUserInfo')
      .mockReturnValueOnce({} as any);

    await userService.updateUser(mock.userCreated.uuid, mock.userCreated as User);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return error User not found, on operation updateUser', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValueOnce(null);

    try {
      await userService.updateUser(mock.userCreated.uuid, mock.userCreated as User);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response).toBe('The specified resource is not found.');
    }
  });

  it('should return error no information to update, on operation updateUser', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValueOnce(mock.userCreated);

    try {
      await userService.updateUser(mock.userCreated.uuid, {} as User);
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

    await userService.deleteUser(mock.userCreated.uuid);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

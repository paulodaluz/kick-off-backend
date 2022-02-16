import { User } from '../../../src/interfaces/user.interface';
import { UserRepository } from '../../../src/repository/user.repository';
import { UserService } from '../../../src/services/user.service';
import mock from '../../mock/user.mock';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

describe('UserService test', () => {
  it('should return success by service UserService on operation registerUser', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValue(null);
    userRepository.registerUser = jest.fn().mockImplementation();

    const result = await userService.registerUser(mock.userToCreate as User);

    expect(typeof result.uuid).toBe('string');
  });

  it('should return error on CNPJ validation, on operation registerUser', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValue(null);

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
    userRepository.getUserByEmail = jest.fn().mockResolvedValue(mock.userCreated);

    try {
      await userService.registerUser(mock.userToCreate as User);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return success on operation getUserInfos', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValue(mock.userCreated);

    const result = await userService.getUserInfos(mock.userCreated.uuid);

    expect(result).toBe(mock.userCreated);
    expect(result.password).toBe(undefined);
  });

  it('should return error User not found, on operation getUserInfos', async () => {
    userRepository.getUserByUuid = jest.fn().mockResolvedValue(null);

    try {
      await userService.getUserInfos(mock.userCreated.uuid);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response).toBe('The specified resource is not found.');
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

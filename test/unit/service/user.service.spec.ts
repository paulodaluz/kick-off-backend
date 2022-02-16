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
});

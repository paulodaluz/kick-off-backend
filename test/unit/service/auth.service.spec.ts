import { User } from '../../../src/interfaces/user.interface';
import { UserRepository } from '../../../src/repository/user.repository';
import { AuthService } from '../../../src/services/auth.service';
import mock from '../../mock/user.mock';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

describe('AuthService test', () => {
  process.env.SECRET_KEY_TO_JWT_TOKEN = 'UNIT_TEST_KEY';

  beforeEach(async () => {
    jest.fn().mockClear();
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should return success by service AuthService on operation registerUser STARTUP', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValue(null);
    userRepository.registerUser = jest.fn().mockImplementation();

    const result = await authService.registerUser(mock.userToCreateStartup as User);

    expect(typeof result.uuid).toBe('string');
    expect(typeof result.token).toBe('string');
  });

  it('should return success by service AuthService on operation registerUser INVESTOR', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValue(null);
    userRepository.registerUser = jest.fn().mockImplementation();

    const result = await authService.registerUser(mock.userToCreateInvestor as User);

    expect(typeof result.uuid).toBe('string');
    expect(typeof result.token).toBe('string');
  });

  it('should return success by service AuthService on operation registerUser Developer', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValue(null);
    userRepository.registerUser = jest.fn().mockImplementation();

    const result = await authService.registerUser(mock.userToCreateDeveloper as User);

    expect(typeof result.uuid).toBe('string');
    expect(typeof result.token).toBe('string');
  });

  it('should return error by service AuthService on operation registerUser IncorrectType', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValue(null);

    try {
      await authService.registerUser(mock.userToCreateIncorrectType as User);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return error on CNPJ validation, on operation registerUser', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValueOnce(null);

    const user = mock.userToCreateStartup;
    user.cnpj = 'xxxx';

    try {
      await authService.registerUser(user as User);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return error User already exists, on operation registerUser', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValueOnce(mock.userStartupCreated);

    try {
      await authService.registerUser(mock.userToCreateStartup as User);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return success by service AuthService on operation login', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValueOnce(mock.userStartupCreated);

    const result = await authService.login(mock.userToCreateStartup as User);

    expect(result.uuid).toBe(mock.userStartupCreated.uuid);
    expect(typeof result.token).toBe('string');
  });

  it('should return error not found, on operation login', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValueOnce(null);

    try {
      await authService.login({email: mock.userToCreateStartup.email, password: mock.userToCreateStartup.password});
    } catch (error) {
      expect(error.status).toBe(403);
      expect(error.response).toBe('Client does not have permission.');
    }
  });
});

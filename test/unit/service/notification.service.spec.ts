import { NotificationService } from '../../../src/services/notifications.service';
import { UserRepository } from '../../../src/repository/user.repository';
import userMock from '../../mock/user.mock';

const userRepository = new UserRepository();
const notificationService = new NotificationService(userRepository);

describe('NotificationService test', () => {
  beforeEach(async () => {
    jest.fn().mockClear();
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should return success by service AuthService on operation registerUser INVESTOR', async () => {
    const spyGetUser = jest
      .spyOn(userRepository, 'getUserByUuid')
      .mockReturnValueOnce(userMock.mockUserDeveloperCreated as any);

    const spyUpdateUser = jest
      .spyOn(userRepository, 'updateUserInfo')
      .mockReturnValueOnce({} as any);

    await notificationService.registerNotification('xxx', 'xxx', 'A example message');

    expect(spyUpdateUser).toHaveBeenCalledTimes(1);
    expect(spyGetUser).toHaveBeenCalledTimes(1);
  });
});

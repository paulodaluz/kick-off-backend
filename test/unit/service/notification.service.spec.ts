import { NotificationService } from '../../../src/services/notifications.service';
import { UserRepository } from '../../../src/repository/user.repository';
import userMock from '../../mock/user.mock';
import notificationMock from '../../mock/notification.mock';

const userRepository = new UserRepository();
const notificationService = new NotificationService(userRepository);

describe('NotificationService test', () => {
  beforeEach(async () => {
    jest.fn().mockClear();
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should return success by service NotificationService on operation registerNotification', async () => {
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

  it(`should return success by service NotificationService on operation registerNotification
    with oldNotifications`, async () => {
    const spyGetUser = jest.spyOn(userRepository, 'getUserByUuid');

    const spyUpdateUser = jest
      .spyOn(userRepository, 'updateUserInfo')
      .mockReturnValueOnce({} as any);

    await notificationService.registerNotification(
      'xxx',
      'xxx',
      'A example message',
      notificationMock.mockNotifications,
    );

    expect(spyUpdateUser).toHaveBeenCalledTimes(1);
    expect(spyGetUser).toHaveBeenCalledTimes(0);
  });

  it(`should return success by service NotificationService on operation deleteNotification
      without notifications`, async () => {
    const spyGetUser = jest
      .spyOn(userRepository, 'getUserByUuid')
      .mockReturnValueOnce(notificationMock.mockUserDeveloperCreated as any);

    const spyUpdateUser = jest
      .spyOn(userRepository, 'updateUserInfo')
      .mockReturnValueOnce({} as any);

    await notificationService.deleteNotification('xxx-notification-uuid', 'xxx-user-uuid');

    expect(spyUpdateUser).toHaveBeenCalledTimes(1);
    expect(spyGetUser).toHaveBeenCalledTimes(1);
  });

  it(`should return success by service NotificationService on operation deleteNotification
      with notifications`, async () => {
    const spyGetUser = jest.spyOn(userRepository, 'getUserByUuid');

    const spyUpdateUser = jest
      .spyOn(userRepository, 'updateUserInfo')
      .mockReturnValueOnce({} as any);

    await notificationService.deleteNotification(
      'xxx-notification-uuid',
      'xxx-user-uuid',
      notificationMock.mockNotifications,
    );

    expect(spyUpdateUser).toHaveBeenCalledTimes(1);
    expect(spyGetUser).toHaveBeenCalledTimes(0);
  });
});

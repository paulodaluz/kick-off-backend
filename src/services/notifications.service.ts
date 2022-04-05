import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '../repository/user.repository';
import { Notification } from '../interfaces/user.interface';

@Injectable()
export class NotificationService {
  private className = 'NotificationService';

  constructor(private readonly userRepository: UserRepository) {}

  public async registerNotification(
    senderUuid: string,
    receiverUuid: string,
    message: string,
    oldNotifications?: Array<Notification>,
  ): Promise<void> {
    Logger.log(
      `senderUuid = ${senderUuid} - receiverUuid = ${receiverUuid} -
        message = ${message} - oldNotifications? = ${oldNotifications?.length}`,
      `${this.className} - ${this.registerNotification.name}`,
    );

    let notificationsStartupUpdated: Array<Notification>;

    const notification = {
      uuid: uuidv4() as string,
      message,
      uuidOfGenerator: senderUuid,
    };

    if (!oldNotifications) {
      const user = await this.userRepository.getUserByUuid(receiverUuid);

      notificationsStartupUpdated = this.concatNotifications(notification, user.notifications);
    }

    if (oldNotifications) {
      notificationsStartupUpdated = this.concatNotifications(notification, oldNotifications);
    }

    await this.userRepository.updateUserInfo(receiverUuid, {
      notifications: notificationsStartupUpdated,
    });
  }

  public async deleteNotification(
    notificationUuid: string,
    userUuid: string,
    userNotifications?: Array<Notification>,
  ): Promise<void> {
    let oldNotifications: Array<Notification>;

    Logger.log(
      `notificationUuid = ${notificationUuid} - userUuid = ${userUuid} -
        userNotifications ${userNotifications?.length}`,
      `${this.className} - ${this.deleteNotification.name}`,
    );

    if (userNotifications) {
      oldNotifications = userNotifications;
    }

    if (!userNotifications) {
      const user = await this.userRepository.getUserByUuid(userUuid);

      oldNotifications = user.notifications;
    }

    const notificationsUpdated = oldNotifications.filter(
      (notification: Notification) => notification.uuid !== notificationUuid,
    );

    await this.userRepository.updateUserInfo(userUuid, {
      notifications: notificationsUpdated,
    });
  }

  private concatNotifications(
    newNotification: Notification,
    oldNotifications: Array<Notification>,
  ): Array<Notification> {
    return oldNotifications.concat([newNotification]);
  }
}

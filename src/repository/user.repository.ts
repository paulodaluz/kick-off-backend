import { Injectable, Logger } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { db } from '../database/configuration.database';
import { ErrorUtils } from '../utils/error.utils';

@Injectable()
export class UserRepository {
  private className = 'UserRepository';

  private databaseName: string;

  constructor() {
    this.databaseName = 'users';
  }

  public async registerUser(user: User): Promise<void> {
    Logger.log(`user = ${user.name}`, `${this.className} - ${this.registerUser.name}`);

    await db
      .collection(this.databaseName)
      .doc(user.uuid)
      .set(user)
      .catch((error: any) => {
        Logger.error(
          `user = ${user.name} - error = ${error}`,
          '',
          `${this.className} - ${this.registerUser.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`user = ${user.name} - SUCCESS`, `${this.className} - ${this.registerUser.name}`);
  }

  public async getUserByUuid(uuid: string): Promise<User> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getUserByUuid.name}`);

    const user = await db
      .collection(this.databaseName)
      .doc(uuid)
      .get()
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.getUserByUuid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.getUserByUuid.name}`);

    return user.data();
  }

  public async updateUserInfo(uuid: string, userInfo: User): Promise<void> {
    Logger.log(
      `uuid = ${uuid} - userInfo = ${JSON.stringify(userInfo)}`,
      `${this.className} - ${this.updateUserInfo.name}`,
    );

    await db
      .collection(this.databaseName)
      .doc(uuid)
      .update(userInfo)
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.updateUserInfo.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.updateUserInfo.name}`);
  }

  public async deleteUserByUuid(uuid: string): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.deleteUserByUuid.name}`);

    await db
      .collection(this.databaseName)
      .doc(uuid)
      .delete()
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.deleteUserByUuid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.deleteUserByUuid.name}`);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { ErrorUtils } from '../utils/error.utils';
import { Utils } from '../utils/utils.utils';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  private className = 'UserService';

  constructor(private readonly userRepository: UserRepository) {}

  public async getUserInfos(uuid: string): Promise<User> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getUserInfos.name}`);

    const user = await this.userRepository.getUserByUuid(uuid);

    if (!user || !user.uuid) {
      Logger.error(`uuid = ${uuid} - ERROR = User not found`,
        `${this.className} - ${this.getUserInfos.name}`,
      );

      ErrorUtils.throwSpecificError(404);
    }

    delete user.password;

    return user;
  }

  public async updateUser(uuid: string, userInfo: Partial<User>): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.updateUser.name}`);

    const startup = await this.userRepository.getUserByUuid(uuid);

    if (!startup || !startup.uuid) {
      Logger.error(`uuid = ${uuid} - ERROR = User not found`,
        `${this.className} - ${this.updateUser.name}`,
      );

      ErrorUtils.throwSpecificError(404);
    }

    Utils.avoidIncorrectUserUpdate(userInfo);

    if (!Object.values(userInfo).length) {
      ErrorUtils.throwSpecificError(400);
    }

    await this.userRepository.updateUserInfo(uuid, userInfo);
  }

  public async deleteUser(uuid: string): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.deleteUser.name}`);

    await this.userRepository.deleteUserByUuid(uuid);
  }
}

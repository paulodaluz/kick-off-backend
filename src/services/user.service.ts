import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { ErrorUtils } from '../utils/error.utils';
import { Utils } from '../utils/utils.utils';
import { Startup, User, UserResponseInterface } from '../interfaces/user.interface';
import { UtilsValidations } from '../utils/validation.utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private className = 'UserService';

  constructor(private readonly userRepository: UserRepository) {}

  public async registerUser(user: User): Promise<UserResponseInterface> {
    Logger.log(`user = ${JSON.stringify(user.name)}`, `${this.className} - ${this.registerUser.name}`);
    const registerExists = await this.userRepository.getUserByEmail(user.email);

    if (registerExists && registerExists.uuid) {
      ErrorUtils.throwSpecificError(400);
    }

    if (user.typeOfUser === 'startup') {
      this.validateCompany(user);
    }

    user.uuid = uuidv4();

    delete user.password;

    await this.userRepository.registerUser(user);

    return { uuid: user.uuid };
  }

  public async getUserInfos(uuid: string): Promise<User> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getUserInfos.name}`);

    const user = await this.userRepository.getUserByUuid(uuid);

    if (!user) {
      ErrorUtils.throwSpecificError(404);
    }

    return user;
  }

  public async updateUser(uuid: string, userInfo: Partial<User>): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.updateUser.name}`);

    const startup = await this.userRepository.getUserByUuid(uuid);

    if (!startup) {
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

  private validateCompany(startup: Startup): void {
    if (!UtilsValidations.isCnpj(startup.cnpj)) {
      ErrorUtils.throwSpecificError(400);
    }
  }
}

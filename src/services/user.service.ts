import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { ErrorUtils } from '../utils/error.utils';
import { Utils } from '../utils/utils.utils';
import { Startup, User, UserLogin, UuidUserResponseInterface } from '../interfaces/user.interface';
import { UtilsValidations } from '../utils/validation.utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private className = 'UserService';

  constructor(private readonly userRepository: UserRepository) {}

  public async registerUser(user: User): Promise<UuidUserResponseInterface> {
    Logger.log(`user = ${JSON.stringify(user.name)}`, `${this.className} - ${this.registerUser.name}`);
    const registerExists = await this.userRepository.getUserByEmail(user.email);

    if (registerExists && registerExists.uuid) {
      Logger.error(`user = ${user.name} - ERROR = User already exists`,
        `${this.className} - ${this.registerUser.name}`,
      );

      ErrorUtils.throwSpecificError(400);
    }

    if (user.typeOfUser === 'startup') {
      this.validateCompany(user);
    }

    user.uuid = uuidv4();

    await this.userRepository.registerUser(user);

    return { uuid: user.uuid };
  }

  public async login(userToAuth: UserLogin): Promise<UuidUserResponseInterface> {
    Logger.log(`email = ${userToAuth.email}`, `${this.className} - ${this.login.name}`);

    const user = await this.userRepository.getUserByEmail(userToAuth.email);

    if (!user || user.password !== userToAuth.password) {
      ErrorUtils.throwSpecificError(403);
    }

    return { uuid: user.uuid };
  }

  public async getUserInfos(uuid: string): Promise<User> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getUserInfos.name}`);

    const user = await this.userRepository.getUserByUuid(uuid);

    if (!user) {
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

    if (!startup) {
      Logger.error(`uuid = ${uuid} - ERROR = User not found`,
        `${this.className} - ${this.getUserInfos.name}`,
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

  private validateCompany(startup: Startup): void {
    if (!UtilsValidations.isCnpj(startup.cnpj)) {
      Logger.error(`startup = ${startup.name} - ERROR = Invalid CNPJ`,
        `${this.className} - ${this.registerUser.name}`,
      );

      ErrorUtils.throwSpecificError(400);
    }
  }
}

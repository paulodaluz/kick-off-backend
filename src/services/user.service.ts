import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { ErrorUtils } from '../utils/error.utils';
import { Utils } from '../utils/utils.utils';
import { User } from 'src/interfaces/user.interface';
import { UtilsValidations } from 'src/utils/validation.utils';
import { Startup } from 'src/interfaces/startup.interface';
import { Investor } from 'src/interfaces/investor.interface';
import { Developer } from 'src/interfaces/dev.interface';

@Injectable()
export class UserService {
  private className = 'UserService';

  constructor(private readonly userRepository: UserRepository) {}

  public async registerUser(user: User): Promise<void> {
    Logger.log(`user = ${JSON.stringify(user)}`, `${this.className} - ${this.registerUser.name}`);

    const registerExists = await this.userRepository.getUserByUuid(user.uuid);

    if (registerExists && registerExists.uuid) {
      ErrorUtils.throwSpecificError(400);
    }

    if (user.typeOfUser === 'startup') {
      this.validateCompany(user);
    }

    if (user.typeOfUser === 'investor' || user.typeOfUser === 'developer') {
      this.validatePerson(user);
    }

    return await this.userRepository.registerUser(user);
  }

  public async getUserInfos(uuid: string): Promise<User> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getUserInfos.name}`);

    const user = await this.userRepository.getUserByUuid(uuid);

    if (!user) {
      ErrorUtils.throwSpecificError(404);
    }

    return user;
  }

  public async updateStartup(uuid: string, userInfo: User): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.updateStartup.name}`);

    const startup = await this.userRepository.getUserByUuid(uuid);

    if (!startup) {
      ErrorUtils.throwSpecificError(404);
    }

    Utils.avoidIncorrectUpdate(userInfo);

    if (!Object.values(userInfo).length) {
      ErrorUtils.throwSpecificError(400);
    }

    await this.userRepository.updateUserInfo(uuid, userInfo);
  }

  public async deleteStartup(uuid: string): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.deleteStartup.name}`);

    return await this.userRepository.deleteUserByUuid(uuid);
  }

  private validateCompany(startup: Startup): void {
    if (!UtilsValidations.isCnpj(startup.cnpj)) {
      ErrorUtils.throwSpecificError(400);
    }
  }

  private validatePerson(user: Developer | Investor) {
    if (!UtilsValidations.isCpf(user.cpf)) {
      ErrorUtils.throwSpecificError(400);
    }
  }
}

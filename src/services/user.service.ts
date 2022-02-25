import { Injectable, Logger } from '@nestjs/common';
import { Requirement } from 'src/interfaces/requirement.interface';
import { UserRepository } from '../repository/user.repository';
import { RequirementRepository } from '../repository/requeriment.repository';
import { ErrorUtils } from '../utils/error.utils';
import { Utils } from '../utils/utils.utils';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  private className = 'UserService';

  constructor(
    private readonly userRepository: UserRepository,
    private readonly requirementRepository: RequirementRepository
  ) {}

  public async getUserInfos(uuid: string): Promise<User> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getUserInfos.name}`);

    const user = await this.userRepository.getUserByUuid(uuid);

    if (!user || !user.uuid) {
      Logger.error(`uuid = ${uuid} - ERROR = User not found`,
        `${this.className} - ${this.getUserInfos.name}`,
      );

      ErrorUtils.throwSpecificError(404);
    }

    Reflect.deleteProperty(user, 'password')

    if(user.typeOfUser === 'startup') {
      const [requirementsDetailsDev, requirementsDetailsInvest] = await Promise.all([
        this.getRequirementsDetails(user.developerRequirements as Array<string>),
        this.getRequirementsDetails(user.investmentRequirements as Array<string>)
      ]);

      Reflect.deleteProperty(user, 'investmentRequirements');
      Reflect.deleteProperty(user, 'developerRequirements');

      user.investmentRaised = requirementsDetailsInvest.reduce((sum, invest) => sum + invest.obtainedMoney, 0);

      const allReq = requirementsDetailsInvest.concat(requirementsDetailsDev);
      user.requirements = allReq.sort((reqOne, reqTwo) =>
        new Date(reqOne.creationDate).getTime() - new Date(reqTwo.creationDate).getTime());
    }

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

  private async getRequirementsDetails(uuidsByRequirements: Array<string>): Promise<Array<Requirement>> {
    const requirements = [];

    uuidsByRequirements.forEach((uuid: string) => {
      requirements.push(this.requirementRepository.getRequirementByUuid(uuid));
    });

    const requirementsResolved = await Promise.all(requirements);

   return requirementsResolved.filter(r => r);
  }
}

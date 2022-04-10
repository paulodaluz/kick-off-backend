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
    private readonly requirementRepository: RequirementRepository,
  ) {}

  public async getUserInfos(uuid: string): Promise<User> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getUserInfos.name}`);

    const user = await this.userRepository.getUserByUuid(uuid);

    if (!user || !user.uuid) {
      Logger.error(
        `uuid = ${uuid} - ERROR = User not found`,
        `${this.className} - ${this.getUserInfos.name}`,
      );

      ErrorUtils.throwSpecificError(404);
    }

    Reflect.deleteProperty(user, 'password');

    switch (user.typeOfUser) {
      case 'startup':
        return this.getStartupInfos(user);
      case 'investor':
        return this.getInvestorInfos(user);
      case 'developer':
        return this.getDeveloperInfos(user);
      default:
        return ErrorUtils.throwSpecificError(400);
    }
  }

  private async getStartupInfos(user: User): Promise<User> {
    const [requirementsDetailsDev, requirementsDetailsInvest] = await Promise.all([
      this.getRequirementsDetails(user.developerRequirements),
      this.getRequirementsDetails(user.investmentRequirements),
    ]);

    Reflect.deleteProperty(user, 'investmentRequirements');
    Reflect.deleteProperty(user, 'developerRequirements');

    user.investmentRaised = requirementsDetailsInvest.reduce(
      (sum, invest) => sum + invest.obtainedMoney,
      0,
    );

    const allReq = requirementsDetailsInvest.concat(requirementsDetailsDev);
    user.requirements = Utils.orderRequirementsByDate(allReq);

    return user;
  }

  private async getDeveloperInfos(user: User): Promise<User> {
    const [workInProgress, requirementsWaitingApproval] = await Promise.all([
      this.getRequirementsDetails(user.workInProgress),
      this.getRequirementsDetails(user.requirementsWaitingApproval),
    ]);

    Reflect.deleteProperty(user, 'workInProgress');
    Reflect.deleteProperty(user, 'requirementsWaitingApproval');

    const completeWorkInProgress = await this.getDescriptionOfStartup(workInProgress);
    const completeRequirementsWaintingApproval = await this.getDescriptionOfStartup(
      requirementsWaitingApproval,
    );

    user.workInProgress = Utils.orderRequirementsByDate(completeWorkInProgress) as any;
    user.requirementsWaitingApproval = Utils.orderRequirementsByDate(
      completeRequirementsWaintingApproval,
    ) as any;

    return user;
  }

  private async getInvestorInfos(user: User): Promise<User> {
    const [investedStartups, requirementsWaitingApproval] = await Promise.all([
      this.getRequirementsDetails(user.investedStartups),
      this.getRequirementsDetails(user.requirementsWaitingApproval),
    ]);

    Reflect.deleteProperty(user, 'investedStartups');
    Reflect.deleteProperty(user, 'requirementsWaitingApproval');

    const completeInvestedStartupsInfo = await this.getDescriptionOfStartup(investedStartups);
    const completeRequirementsWaintingApproval = await this.getDescriptionOfStartup(
      requirementsWaitingApproval,
    );

    user.investedStartups = Utils.orderRequirementsByDate(completeInvestedStartupsInfo) as any;
    user.requirementsWaitingApproval = Utils.orderRequirementsByDate(
      completeRequirementsWaintingApproval,
    ) as any;

    return user;
  }

  public async updateUser(uuid: string, userInfo: Partial<User>): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.updateUser.name}`);

    Utils.avoidIncorrectUserUpdate(userInfo);

    if (!Object.values(userInfo).length) {
      ErrorUtils.throwSpecificError(400);
    }

    const startup = await this.userRepository.getUserByUuid(uuid);

    if (!startup || !startup.uuid) {
      Logger.error(
        `uuid = ${uuid} - ERROR = User not found`,
        `${this.className} - ${this.updateUser.name}`,
      );

      ErrorUtils.throwSpecificError(404);
    }

    if (userInfo.newPassword && userInfo.oldPassword) {
      if (!(await Utils.verifyPassword(userInfo.oldPassword, startup.password))) {
        ErrorUtils.throwSpecificError(403);
      }

      userInfo.password = await Utils.encryptPassword(userInfo.newPassword);

      Reflect.deleteProperty(userInfo, 'newPassword');
      Reflect.deleteProperty(userInfo, 'oldPassword');
    }

    await this.userRepository.updateUserInfo(uuid, userInfo);
  }

  public async deleteUser(uuid: string): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.deleteUser.name}`);

    await this.userRepository.deleteUserByUuid(uuid);
  }

  private async getRequirementsDetails(
    uuidsByRequirements: Array<string>,
  ): Promise<Array<Requirement>> {
    const requirements = [];

    uuidsByRequirements.forEach((uuid: string) => {
      requirements.push(this.requirementRepository.getRequirementByUuid(uuid));
    });

    const requirementsResolved = await Promise.all(requirements);

    return requirementsResolved.filter((r) => r);
  }

  public async getDescriptionOfStartup(requirements: Array<Requirement>): Promise<Requirement[]> {
    const requirementsComplete = requirements.map(async (requeriment) => {
      const user = await this.userRepository.getUserByUuid(requeriment.createdBy);

      requeriment.descriptionOfStartup = user.description;
      requeriment.nameOfStartup = user.name;

      return requeriment;
    });

    return Promise.all(requirementsComplete);
  }
}

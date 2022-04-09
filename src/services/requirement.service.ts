import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Requirement } from '../interfaces/requirement.interface';
import { Startup, User } from '../interfaces/user.interface';
import { RequirementRepository } from '../repository/requeriment.repository';
import { UserRepository } from '../repository/user.repository';
import { ErrorUtils } from '../utils/error.utils';
import { Utils } from '../utils/utils.utils';
import { NotificationService } from './notifications.service';

@Injectable()
export class RequirementService {
  private className = 'RequirementService';

  constructor(
    private readonly requirementRepository: RequirementRepository,
    private readonly userRepository: UserRepository,
    private readonly notificationService: NotificationService,
  ) {}

  public async registerRequirement(uuidByStatup: string, requirement: Requirement): Promise<void> {
    Logger.log(
      `requirement = ${JSON.stringify(requirement)}`,
      `${this.className} - ${this.registerRequirement.name}`,
    );

    requirement.uuid = uuidv4();

    const startup = await this.userRepository.getUserByUuid(uuidByStatup);

    if (!startup || !startup.uuid) {
      ErrorUtils.throwSpecificError(404);
    }

    if (requirement.typeOfRequirement === 'investment') {
      requirement.obtainedMoney = 0;
    }

    requirement.status = 'opened';
    requirement.creationDate = new Date().toString();
    requirement.createdBy = uuidByStatup;

    await Promise.all([
      this.requirementRepository.registerRequirement(requirement),
      this.linkRequirementToAStartup(startup, requirement),
    ]);
  }

  private async linkRequirementToAStartup(
    startup: Startup,
    requirement: Requirement,
  ): Promise<void> {
    Logger.log(
      `requirement = ${JSON.stringify(requirement)}`,
      `${this.className} - ${this.linkRequirementToAStartup.name}`,
    );

    if (requirement.typeOfRequirement === 'investment') {
      const investRequiremntsRequirementsUpdated = startup.investmentRequirements.concat(
        requirement.uuid,
      );

      await this.userRepository.updateUserInfo(startup.uuid, {
        investmentRequirements: investRequiremntsRequirementsUpdated,
      });

      return;
    }

    const developerRequirementsUpdated = startup.developerRequirements.concat(requirement.uuid);

    await this.userRepository.updateUserInfo(startup.uuid, {
      developerRequirements: developerRequirementsUpdated,
    });
  }

  public async getRequirementsByUuid(
    uuidsByRequirements: Array<string>,
  ): Promise<Array<Requirement>> {
    const requirements = [];

    uuidsByRequirements.forEach((uuid) => {
      requirements.push(this.requirementRepository.getRequirementByUuid(uuid));
    });

    const requirementsResolved = await Promise.all(requirements);

    const removingNullReqs = requirementsResolved.filter((r) => r);

    if (!removingNullReqs.length) {
      ErrorUtils.throwSpecificError(400);
    }

    return removingNullReqs;
  }

  public async getRequirementsByType(
    typeOfRequirement: 'development' | 'investment',
  ): Promise<Array<Requirement>> {
    if (typeOfRequirement !== 'development' && typeOfRequirement !== 'investment') {
      ErrorUtils.throwSpecificError(400);
    }

    const requeriments = await this.requirementRepository.getRequirementByType(typeOfRequirement);

    const openedReqs = requeriments.filter((requirement) => requirement.status === 'opened');

    const requirementsUpdated = await this.getDescriptionOfStartup(openedReqs);

    return requirementsUpdated;
  }

  private async getDescriptionOfStartup(requirements: Array<Requirement>): Promise<Requirement[]> {
    const requirementsComplete = requirements.map(async (requeriment) => {
      const user = await this.userRepository.getUserByUuid(requeriment.createdBy);

      requeriment.descriptionOfStartup = user.description;
      requeriment.nameOfStartup = user.name;

      return requeriment;
    });

    return Promise.all(requirementsComplete);
  }

  public async linkRequirementToCustomer(
    uuidByCustomer: string, // Investor or Developer
    uuidByRequirement: string,
    uuidByStartupProprietress: string,
  ): Promise<void> {
    const [customer, startupProprietressOfReq] = await Promise.all([
      this.userRepository.getUserByUuid(uuidByCustomer),
      this.userRepository.getUserByUuid(uuidByStartupProprietress),
    ]);

    const requirementsWaitingApprovalUpdated =
      customer.requirementsWaitingApproval.concat(uuidByRequirement);

    await Promise.all([
      this.userRepository.updateUserInfo(uuidByCustomer, {
        requirementsWaitingApproval: requirementsWaitingApprovalUpdated,
      }),

      this.notificationService.registerNotification(
        uuidByCustomer,
        uuidByStartupProprietress,
        `Sua requisição tem um ${
          customer.typeOfUser === 'investor' ? 'investidor' : 'desenvolvedor'
        } aguardando análise!`,
        startupProprietressOfReq.notifications,
        uuidByRequirement,
      ),
    ]);
  }

  public async assessCustomerInteraction(
    uuidByCustomer: string, // dev or investor
    uuidByRequirement: string,
    uuidByStartupProprietress: string,
    notificationUuid: string,
    interactionStatus: 'accept' | 'reject',
  ): Promise<void> {
    const [customer, startupProprietressOfReq, requeriment] = await Promise.all([
      this.userRepository.getUserByUuid(uuidByCustomer),
      this.userRepository.getUserByUuid(uuidByStartupProprietress),
      this.requirementRepository.getRequirementByUuid(uuidByRequirement),
    ]);

    const { typeOfUser } = customer;
    let requirementByClientUpdated;

    const reqsWaitingApprovalUpdated = customer.requirementsWaitingApproval.filter(
      (req) => req !== uuidByRequirement,
    );

    if (typeOfUser === 'developer') {
      requirementByClientUpdated = customer.workInProgress.concat(uuidByRequirement);
    }

    if (typeOfUser === 'investor') {
      requirementByClientUpdated = customer.investedStartups.concat(uuidByRequirement);
    }

    Promise.all([
      this.userRepository.updateUserInfo(
        uuidByCustomer,
        this.getDataOfUserToUpdate(
          typeOfUser,
          reqsWaitingApprovalUpdated,
          requirementByClientUpdated,
        ),
      ),
      this.notificationService.registerNotification(
        uuidByStartupProprietress,
        uuidByCustomer,
        'Parabéns sua foi aceita pela Startup, você pode consulta-la em `Investimentos e contratos recentes`',
        customer.notifications,
      ),
      this.notificationService.deleteNotification(
        notificationUuid,
        uuidByStartupProprietress,
        startupProprietressOfReq.notifications,
      ),
      this.requirementRepository.updateRequirementInfo(
        uuidByRequirement,
        this.getDataOfRequirementToUpdate(requeriment, uuidByCustomer),
      ),
    ]);
  }

  private getDataOfRequirementToUpdate(
    requeriment: Requirement,
    uuidByCustomer: string,
  ): Partial<Requirement> {
    if (requeriment.typeOfRequirement === 'investment') {
      return {
        status: 'concluded',
        obtainedMoney: requeriment.requiredMoney,
        investor: uuidByCustomer,
      };
    }

    return {
      status: 'concluded',
      developer: uuidByCustomer,
    };
  }

  private getDataOfUserToUpdate(
    typeOfUser: string,
    reqsWaitingApprovalUpdated: Array<string>,
    workInProgressUpdated: Array<string>,
  ): Partial<User> {
    if (typeOfUser === 'investor') {
      return {
        requirementsWaitingApproval: reqsWaitingApprovalUpdated,
        investedStartups: workInProgressUpdated,
      };
    }

    return {
      requirementsWaitingApproval: reqsWaitingApprovalUpdated,
      workInProgress: workInProgressUpdated,
    };
  }

  public async updateRequirement(
    uuid: string,
    requirementToUpdate: Partial<Requirement>,
  ): Promise<void> {
    const requirement = await this.requirementRepository.getRequirementByUuid(uuid);

    if (!requirement || !requirement.uuid) {
      ErrorUtils.throwSpecificError(404);
    }

    if (
      (requirement.obtainedMoney > 0 && requirementToUpdate.requiredMoney) ||
      requirement.status === 'concluded'
    ) {
      ErrorUtils.throwSpecificError(403);
    }

    Utils.avoidIncorrectRequirementUpdate(requirementToUpdate);

    if (!Object.values(requirementToUpdate).length) {
      ErrorUtils.throwSpecificError(400);
    }

    await this.requirementRepository.updateRequirementInfo(uuid, requirementToUpdate);
  }

  public async deleteRequirement(uuidByRequirement: string, uuidByStatup: string): Promise<void> {
    const [requirement, startup] = await Promise.all([
      this.requirementRepository.getRequirementByUuid(uuidByRequirement),
      this.userRepository.getUserByUuid(uuidByStatup),
    ]);

    if (!requirement || !requirement.uuid || !startup || !startup.uuid) {
      ErrorUtils.throwSpecificError(404);
    }

    if (requirement.status === 'concluded') {
      ErrorUtils.throwSpecificError(403);
    }

    if (requirement.typeOfRequirement === 'investment') {
      return this.deleteRequirementOfInvestment(requirement, startup);
    }

    return this.deleteRequirementOfDevelop(requirement, startup);
  }

  private async deleteRequirementOfInvestment(
    requirement: Requirement,
    startup: Startup,
  ): Promise<void> {
    if (requirement.obtainedMoney > 0) {
      ErrorUtils.throwSpecificError(403);
    }

    const updatedReqInvest = startup.investmentRequirements.filter(
      (reqInvest) => reqInvest !== requirement.uuid,
    );

    await Promise.all([
      this.userRepository.updateUserInfo(startup.uuid, {
        investmentRequirements: updatedReqInvest,
      }),
      this.requirementRepository.deleteRequirementByUuid(requirement.uuid),
    ]);
  }

  private async deleteRequirementOfDevelop(
    requirement: Requirement,
    startup: Startup,
  ): Promise<void> {
    const updatedReqDev = startup.developerRequirements.filter(
      (reqDev) => reqDev !== requirement.uuid,
    );

    await Promise.all([
      this.userRepository.updateUserInfo(startup.uuid, {
        developerRequirements: updatedReqDev,
      }),
      this.requirementRepository.deleteRequirementByUuid(requirement.uuid),
    ]);
  }
}

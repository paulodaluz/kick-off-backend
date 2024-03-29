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
    Logger.log(
      `uuidsByRequirements = ${JSON.stringify(uuidsByRequirements)}`,
      `${this.className} - ${this.getRequirementsByUuid.name}`,
    );

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
    Logger.log(
      `typeOfRequirement = ${typeOfRequirement}`,
      `${this.className} - ${this.getRequirementsByType.name}`,
    );

    if (typeOfRequirement !== 'development' && typeOfRequirement !== 'investment') {
      ErrorUtils.throwSpecificError(400);
    }

    const requeriments = await this.requirementRepository.getRequirementByType(typeOfRequirement);

    const openedReqs = requeriments.filter((requirement) => requirement.status === 'opened');

    return this.getDescriptionOfStartup(openedReqs);
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
    Logger.log(
      `uuidByCustomer = ${uuidByCustomer} - uuidByRequirement = ${uuidByRequirement}
        - uuidByStartupProprietress = ${uuidByStartupProprietress}`,
      `${this.className} - ${this.linkRequirementToCustomer.name}`,
    );

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
    Logger.log(
      `uuidByCustomer = ${uuidByCustomer} - uuidByRequirement = ${uuidByRequirement}
        - uuidByStartupProprietress = ${uuidByStartupProprietress} - notificationUuid = ${notificationUuid}
        - interactionStatus = ${interactionStatus}`,
      `${this.className} - ${this.assessCustomerInteraction.name}`,
    );

    const [customer, startupProprietressOfReq, requeriment] = await Promise.all([
      this.userRepository.getUserByUuid(uuidByCustomer),
      this.userRepository.getUserByUuid(uuidByStartupProprietress),
      this.requirementRepository.getRequirementByUuid(uuidByRequirement),
    ]);

    const reqsWaitingApprovalUpdated = customer.requirementsWaitingApproval.filter(
      (req) => req !== uuidByRequirement,
    );

    const requirementByClientUpdated = this.getRequirementByClientUpdated(
      interactionStatus,
      customer,
      uuidByRequirement,
    );

    const operationsToDo = [
      this.userRepository.updateUserInfo(
        uuidByCustomer,
        this.getDataOfUserToUpdate(
          customer.typeOfUser,
          reqsWaitingApprovalUpdated,
          requirementByClientUpdated,
          interactionStatus,
        ),
      ),

      this.notificationService.registerNotification(
        uuidByStartupProprietress,
        uuidByCustomer,
        this.getMessageToCustomer(interactionStatus, startupProprietressOfReq.name),
        customer.notifications,
      ),

      this.notificationService.deleteNotification(
        notificationUuid,
        uuidByStartupProprietress,
        startupProprietressOfReq.notifications,
      ),
    ];

    if (interactionStatus === 'accept') {
      operationsToDo.push(
        this.requirementRepository.updateRequirementInfo(
          uuidByRequirement,
          this.getDataOfRequirementToUpdate(requeriment, uuidByCustomer),
        ),
      );
    }

    await Promise.all(operationsToDo);
  }

  private getRequirementByClientUpdated(
    interactionStatus: 'accept' | 'reject',
    customer: User,
    uuidByRequirement: string,
  ): Array<string> | null {
    if (interactionStatus === 'reject') return null;

    if (customer.typeOfUser === 'investor') {
      return customer.investedStartups.concat(uuidByRequirement);
    }

    return customer.workInProgress.concat(uuidByRequirement);
  }

  private getMessageToCustomer(
    interactionStatus: 'accept' | 'reject',
    nameOfStartup: string,
  ): string {
    if (interactionStatus === 'accept') {
      return `Parabéns seu apoio foi aceito pela Startup ${nameOfStartup}
      , você pode consulta-la em 'Investimentos e contratos recentes'`;
    }

    return `No momento seu apoio não foi aceito pela Startup ${nameOfStartup}!`;
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
    interactionStatus: 'accept' | 'reject',
  ): Partial<User> {
    if (interactionStatus === 'reject') {
      return { requirementsWaitingApproval: reqsWaitingApprovalUpdated };
    }

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
    Logger.log(
      `uuid = ${uuid} - requirementToUpdate = ${requirementToUpdate}`,
      `${this.className} - ${this.updateRequirement.name}`,
    );

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
    Logger.log(
      `uuidByRequirement = ${uuidByRequirement} - uuidByStatup = ${uuidByStatup}`,
      `${this.className} - ${this.deleteRequirement.name}`,
    );

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

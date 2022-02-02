import { Injectable, Logger } from '@nestjs/common';
import { Requirement } from '../interfaces/requirement.interface';
import { Startup } from '../interfaces/user.interface';
import { RequirementRepository } from '../repository/requeriment.repository';
import { UserRepository } from '../repository/user.repository';
import { ErrorUtils } from '../utils/error.utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequirementService {
  private className = 'RequirementService';

  constructor(
    private readonly requirementRepository: RequirementRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async registerRequirement(uuidByStatup: string, requirement: Requirement): Promise<void> {
    Logger.log(
      `requirement = ${JSON.stringify(requirement)}`,
      `${this.className} - ${this.registerRequirement.name}`,
    );

    requirement.uuid = uuidv4();

    await this.requirementRepository.registerRequirement(requirement);
    await this.linkRequirementToAStartup(uuidByStatup, requirement);
  }

  private async linkRequirementToAStartup(
    uuidByStatup: string,
    requirement: Requirement,
  ): Promise<void> {
    Logger.log(
      `requirement = ${JSON.stringify(requirement)}`,
      `${this.className} - ${this.linkRequirementToAStartup.name}`,
    );

    const startup: Startup = await this.userRepository.getUserByUuid(uuidByStatup);

    if (!startup && !startup.uuid) {
      ErrorUtils.throwSpecificError(404);
    }

    if (requirement.typeOfRequirement === 'investment') {
      if (!startup.investmentRequirements) {
        startup.investmentRequirements = [];
      }

      const investRequiremntsRequirementsUpdated = startup.investmentRequirements.concat(
        requirement.uuid,
      );

      await this.userRepository.updateUserInfo(uuidByStatup, {
        investmentRequirements: investRequiremntsRequirementsUpdated,
      });
    }

    if (requirement.typeOfRequirement === 'development') {
      if (!startup.developerRequirements) {
        startup.developerRequirements = [];
      }

      const developerRequirementsUpdated = startup.developerRequirements.concat(requirement.uuid);

      await this.userRepository.updateUserInfo(uuidByStatup, {
        developerRequirements: developerRequirementsUpdated,
      });
    }
  }

  public async getRequirementsByType(
    typeOfRequirement: 'development' | 'investment',
  ): Promise<Array<Requirement>> {
    if (typeOfRequirement !== 'development' && typeOfRequirement !== 'investment') {
      ErrorUtils.throwSpecificError(400);
    }

    return await this.requirementRepository.getRequirementByType(typeOfRequirement);
  }

  public async deleteRequirement(uuidByRequirement: string, uuidByStatup: string): Promise<void> {
    const [requirement, startup] = await Promise.all([
      this.requirementRepository.getRequirementByUuid(uuidByRequirement),
      this.userRepository.getUserByUuid(uuidByStatup),
    ]);

    if (!requirement && !requirement.uuid && !startup && !startup.uuid) {
      ErrorUtils.throwSpecificError(404);
    }

    if (requirement.typeOfRequirement === 'development') {
      return await this.deleteRequirementOfDevelop(requirement, startup);
    }

    if (requirement.typeOfRequirement === 'investment') {
      return await this.deleteRequirementOfInvestment(requirement, startup);
    }
  }

  private async deleteRequirementOfInvestment(
    requirement: Requirement,
    startup: Startup,
  ): Promise<void> {
    if (requirement.obtainedMoney && requirement.obtainedMoney > 0) {
      ErrorUtils.throwSpecificError(403);
    }

    const updatedReqInvest = startup.investmentRequirements.filter(
      (reqInvest) => reqInvest != requirement.uuid,
    );

    await Promise.all([
      this.userRepository.updateUserInfo(startup.uuid, {
        investmentRequirements: updatedReqInvest,
      }),
      this.requirementRepository.deleteRequirementByUuid(requirement.uuid),
    ]);

    return;
  }

  private async deleteRequirementOfDevelop(
    requirement: Requirement,
    startup: Startup,
  ): Promise<void> {
    const updatedReqDev = startup.developerRequirements.filter(
      (reqDev) => reqDev != requirement.uuid,
    );

    await Promise.all([
      this.userRepository.updateUserInfo(startup.uuid, {
        developerRequirements: updatedReqDev,
      }),
      this.requirementRepository.deleteRequirementByUuid(requirement.uuid),
    ]);
  }
}

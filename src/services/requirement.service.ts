import { Injectable, Logger } from '@nestjs/common';
import { Requirement } from 'src/interfaces/requirement.interface';
import { Startup } from 'src/interfaces/user.interface';
import { RequirementRepository } from 'src/repository/requeriment.repository';
import { UserRepository } from 'src/repository/user.repository';
import { ErrorUtils } from 'src/utils/error.utils';
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

  public async getRequirementsByType(typeOfRequirement): Promise<Array<Requirement>> {
    if (typeOfRequirement !== 'development' && typeOfRequirement !== 'investment') {
      ErrorUtils.throwSpecificError(400);
    }

    return await this.requirementRepository.getRequirementByType(typeOfRequirement);
  }
}

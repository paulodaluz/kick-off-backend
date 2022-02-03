import { Injectable, Logger } from '@nestjs/common';
import { Requirement } from '../interfaces/requirement.interface';
import { db } from '../database/configuration.database';
import { ErrorUtils } from '../utils/error.utils';

@Injectable()
export class RequirementRepository {
  private className = 'RequirementRepository';

  private databaseName: string;

  constructor() {
    this.databaseName = 'requirements';
  }

  public async registerRequirement(requirement: Requirement): Promise<void> {
    Logger.log(
      `requirement = ${requirement.uuid}`,
      `${this.className} - ${this.registerRequirement.name}`,
    );

    await db
      .collection(this.databaseName)
      .doc(requirement.uuid)
      .set(requirement)
      .catch((error: any) => {
        Logger.error(
          `user = ${requirement.uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.registerRequirement.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(
      `requirement = ${requirement.uuid} - SUCCESS`,
      `${this.className} - ${this.registerRequirement.name}`,
    );
  }

  public async getRequirementByUuid(uuid: string): Promise<Requirement> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getRequirementByUuid.name}`);

    const user = await db
      .collection(this.databaseName)
      .doc(uuid)
      .get()
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.getRequirementByUuid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.getRequirementByUuid.name}`);

    return user.data();
  }

  public async getRequirementByType(
    typeOfRequirement: 'development' | 'investment',
  ): Promise<Array<Requirement>> {
    const requirements = [];
    Logger.log(
      `typeOfRequirement = ${typeOfRequirement}`,
      `${this.className} - ${this.getRequirementByType.name}`,
    );

    const snapshot = await db
      .collection(this.databaseName)
      .where('typeOfRequirement', '==', typeOfRequirement)
      .get()
      .catch((error: any) => {
        Logger.error(
          `typeOfRequirement = ${typeOfRequirement} - error = ${error}`,
          '',
          `${this.className} - ${this.getRequirementByType.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    if (snapshot.empty) {
      Logger.log(
        `typeOfRequirement = ${typeOfRequirement} - SUCCESS - NOT FOUND DATA`,
        `${this.className} - ${this.getRequirementByType.name}`,
      );
      return requirements;
    }

    Logger.log(
      `typeOfRequirement = ${typeOfRequirement} - SUCCESS`,
      `${this.className} - ${this.registerRequirement.name}`,
    );

    snapshot.forEach((doc) => {
      requirements.push(Object.assign(doc.data(), { uuid: doc.id }));
    });

    return requirements;
  }

  public async updateRequirementInfo(
    uuid: string,
    requirementInfo: Partial<Requirement>,
  ): Promise<void> {
    Logger.log(
      `uuid = ${uuid} - requirementInfo = ${JSON.stringify(requirementInfo)}`,
      `${this.className} - ${this.updateRequirementInfo.name}`,
    );

    await db
      .collection(this.databaseName)
      .doc(uuid)
      .update(requirementInfo)
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.updateRequirementInfo.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(
      `uuid = ${uuid} - SUCCESS`,
      `${this.className} - ${this.updateRequirementInfo.name}`,
    );
  }

  public async deleteRequirementByUuid(uuid: string): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.deleteRequirementByUuid.name}`);

    await db
      .collection(this.databaseName)
      .doc(uuid)
      .delete()
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.deleteRequirementByUuid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(
      `uuid = ${uuid} - SUCCESS`,
      `${this.className} - ${this.deleteRequirementByUuid.name}`,
    );
  }
}

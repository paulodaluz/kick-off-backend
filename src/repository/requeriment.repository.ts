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

  public async getRequirementByType(
    typeOfRequirement: 'development' | 'investment',
  ): Promise<Array<Requirement>> {
    const requirements = [];
    Logger.log(
      `typeOfRequirement = ${typeOfRequirement}`,
      `${this.className} - ${this.registerRequirement.name}`,
    );

    const snapshot = await db
      .collection(this.databaseName)
      .where('typeOfRequirement', '==', typeOfRequirement)
      .get();
    /*. catch((error: any) => {
        Logger.error(
          `typeOfRequirement = ${typeOfRequirement} - error = ${error}`,
          '',
          `${this.className} - ${this.registerRequirement.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      }); */

    if (snapshot.empty) {
      Logger.log(
        `typeOfRequirement = ${typeOfRequirement} - SUCCESS - NOT FOUND DATA`,
        `${this.className} - ${this.registerRequirement.name}`,
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
}

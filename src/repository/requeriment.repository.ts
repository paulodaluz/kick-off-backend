import { Injectable, Logger } from '@nestjs/common';
import { Requirement } from '../interfaces/requirement.interface';
import { ErrorUtils } from '../utils/error.utils';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../database/configuration.database';

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

    await setDoc(doc(db, this.databaseName, requirement.uuid), requirement)
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

    const reqRef = doc(db, this.databaseName, uuid);
    const requirement = await getDoc(reqRef)
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.getRequirementByUuid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.getRequirementByUuid.name}`);

    return requirement.data() as Requirement;
  }

  public async getRequirementByType(
    typeOfRequirement: 'development' | 'investment',
  ): Promise<Array<Requirement>> {
    const requirements = [];
    Logger.log(
      `typeOfRequirement = ${typeOfRequirement}`,
      `${this.className} - ${this.getRequirementByType.name}`,
    );

    const requirementRef = collection(db, this.databaseName);

    const queryToSearch = query(requirementRef, where("typeOfRequirement", "==", typeOfRequirement));

    const snapshot = await getDocs(queryToSearch).catch((error: any) => {
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
      return [];
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

    const requirementRef = doc(db, this.databaseName, uuid);

    await updateDoc(requirementRef, requirementInfo)
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

    await deleteDoc(doc(db, this.databaseName, uuid))
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

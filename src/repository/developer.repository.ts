import { Injectable, Logger } from '@nestjs/common';
import { Developer } from 'src/interfaces/dev.interface';
import { db } from '../database/configuration.database';
import { ErrorUtils } from '../utils/error.utils';

@Injectable()
export class DeveloperRepository {
  private className = 'DeveloperRepository';

  private databaseName: string;

  constructor() {
    this.databaseName = 'developers';
  }

  public async registerDeveloper(developer: Developer): Promise<void> {
    Logger.log(
      `developer = ${developer.name}`,
      `${this.className} - ${this.registerDeveloper.name}`,
    );

    await db
      .collection(this.databaseName)
      .doc(developer.uuid)
      .set(developer)
      .catch((error: any) => {
        Logger.error(
          `investor = ${developer.name} - error = ${error}`,
          '',
          `${this.className} - ${this.registerDeveloper.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(
      `investor = ${developer.name} - SUCCESS`,
      `${this.className} - ${this.registerDeveloper.name}`,
    );
  }

  public async getDeveloperByUuid(uuid: string): Promise<Developer> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getDeveloperByUuid.name}`);

    const user = await db
      .collection(this.databaseName)
      .doc(uuid)
      .get()
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.getDeveloperByUuid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.getDeveloperByUuid.name}`);

    return user.data();
  }

  public async deleteDeveloperByUuid(uuid: string): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.deleteDeveloperByUuid.name}`);

    await db
      .collection(this.databaseName)
      .doc(uuid)
      .delete()
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.deleteDeveloperByUuid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(
      `uuid = ${uuid} - SUCCESS`,
      `${this.className} - ${this.deleteDeveloperByUuid.name}`,
    );
  }
}

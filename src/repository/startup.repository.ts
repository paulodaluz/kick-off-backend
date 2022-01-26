import { Injectable, Logger } from '@nestjs/common';
import { Startup } from 'src/interfaces/startup.interface';
import { db } from '../database/configuration.database';
import { ErrorUtils } from '../utils/error.utils';

@Injectable()
export class StartupRepository {
  private className = 'StartupRepository';

  private databaseName: string;

  constructor() {
    this.databaseName = 'startups';
  }

  public async registerStartup(startup: Startup): Promise<void> {
    Logger.log(`startup = ${startup.name}`, `${this.className} - ${this.registerStartup.name}`);

    await db
      .collection(this.databaseName)
      .doc(startup.uuid)
      .set(startup)
      .catch((error: any) => {
        Logger.error(
          `startup = ${startup.name} - error = ${error}`,
          '',
          `${this.className} - ${this.registerStartup.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(
      `startup = ${startup.name} - SUCCESS`,
      `${this.className} - ${this.registerStartup.name}`,
    );
  }

  public async getStartupByUuid(uuid: string): Promise<Startup> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getStartupByUuid.name}`);

    const user = await db
      .collection(this.databaseName)
      .doc(uuid)
      .get()
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.getStartupByUuid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.getStartupByUuid.name}`);

    return user.data();
  }

  public async updateStartupInfo(uuid: String, startupInfo: Startup): Promise<void> {
    Logger.log(
      `uuid = ${uuid} - startupInfo = ${JSON.stringify(startupInfo)}`,
      `${this.className} - ${this.updateStartupInfo.name}`,
    );

    await db
      .collection(this.databaseName)
      .doc(uuid)
      .update(startupInfo)
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.updateStartupInfo.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.updateStartupInfo.name}`);
  }

  public async deleteStartupByUuid(uuid: string): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.deleteStartupByUuid.name}`);

    await db
      .collection(this.databaseName)
      .doc(uuid)
      .delete()
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.deleteStartupByUuid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.deleteStartupByUuid.name}`);
  }
}

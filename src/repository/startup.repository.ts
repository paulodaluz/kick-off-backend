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
}

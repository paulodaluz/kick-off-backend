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
}

import { Injectable, Logger } from '@nestjs/common';
import { Investor } from 'src/interfaces/investor.interface';
import { db } from '../database/configuration.database';
import { ErrorUtils } from '../utils/error.utils';

@Injectable()
export class InvestorRepository {
  private className = 'InvestorRepository';

  private databaseName: string;

  constructor() {
    this.databaseName = 'investors';
  }

  public async registerInvestor(investor: Investor): Promise<void> {
    Logger.log(`investor = ${investor.name}`, `${this.className} - ${this.registerInvestor.name}`);

    await db
      .collection(this.databaseName)
      .doc(investor.uuid)
      .set(investor)
      .catch((error: any) => {
        Logger.error(
          `investor = ${investor.name} - error = ${error}`,
          '',
          `${this.className} - ${this.registerInvestor.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(
      `investor = ${investor.name} - SUCCESS`,
      `${this.className} - ${this.registerInvestor.name}`,
    );
  }

  public async getInvestorByUuid(uuid: string): Promise<Investor> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getInvestorByUuid.name}`);

    const user = await db
      .collection(this.databaseName)
      .doc(uuid)
      .get()
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.getInvestorByUuid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.getInvestorByUuid.name}`);

    return user.data();
  }

  public async deleteInvestorByUuid(uuid: string): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.deleteInvestorByUuid.name}`);

    await db
      .collection(this.databaseName)
      .doc(uuid)
      .delete()
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.deleteInvestorByUuid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.deleteInvestorByUuid.name}`);
  }
}

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
}

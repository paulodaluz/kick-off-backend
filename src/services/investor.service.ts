import { Injectable, Logger } from '@nestjs/common';
import { Investor } from 'src/interfaces/investor.interface';
import { InvestorRepository } from 'src/repository/investor.repository';
import { ErrorUtils } from 'src/utils/error.utils';

@Injectable()
export class InvestorService {
  private className = 'InvestorService';

  constructor(private readonly investorRepository: InvestorRepository) {}

  public async registerInvestor(investor: Investor): Promise<void> {
    Logger.log(
      `investor = ${JSON.stringify(investor)}`,
      `${this.className} - ${this.registerInvestor.name}`,
    );

    /* const investorExists = await this.investorRepository.getInvestorByUuid(investor.uuid);

    if (investorExists && investorExists.uuid) {
      ErrorUtils.throwSpecificError(400);
    } */

    return await this.investorRepository.registerInvestor(investor);
  }

  public async getInvestor(uuid: string): Promise<Investor> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getInvestor.name}`);

    const investor = await this.investorRepository.getInvestorByUuid(uuid);

    if (!investor) {
      ErrorUtils.throwSpecificError(404);
    }

    return investor;
  }
}

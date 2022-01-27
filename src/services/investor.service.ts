import { Injectable, Logger } from '@nestjs/common';
import { Investor } from 'src/interfaces/investor.interface';
import { InvestorRepository } from 'src/repository/investor.repository';

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
}

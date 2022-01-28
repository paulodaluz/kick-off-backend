import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { Investor } from 'src/interfaces/investor.interface';
import { InvestorService } from 'src/services/investor.service';
import { RegisterInvestorValidator } from 'src/validators/investor.validator';

@Controller('investor')
export class InvestorController {
  constructor(private readonly investorService: InvestorService) {}

  @Post('register')
  async registerInvestor(
    @Body(new ValidationPipe()) body: RegisterInvestorValidator,
  ): Promise<void> {
    return await this.investorService.registerInvestor(body);
  }

  @Get('get-infos/:identifier')
  async getInvestor(@Param('identifier') identifier: string): Promise<Investor> {
    return await this.investorService.getInvestor(identifier);
  }

  @Put('update-info/:identifier')
  async updateInvestor(
    @Param('identifier') identifier: string,
    @Body() body: Investor,
  ): Promise<void> {
    return await this.investorService.updateInvestor(identifier, body);
  }

  @Delete('delete-investor/:identifier')
  async deleteInvestor(@Param('identifier') identifier: string): Promise<void> {
    return await this.investorService.deleteInvestor(identifier);
  }
}

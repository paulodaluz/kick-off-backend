import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
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
}

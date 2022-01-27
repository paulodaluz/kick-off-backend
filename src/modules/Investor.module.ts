import { Module } from '@nestjs/common';
import { InvestorController } from 'src/controllers/investor.controller';
import { InvestorRepository } from 'src/repository/investor.repository';
import { InvestorService } from 'src/services/investor.service';

@Module({
  imports: [],
  controllers: [InvestorController],
  providers: [InvestorService, InvestorRepository],
})
export class InvestorModule {}

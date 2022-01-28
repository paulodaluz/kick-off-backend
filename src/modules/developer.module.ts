import { Module } from '@nestjs/common';
import { DeveloperController } from 'src/controllers/developer.controller';
import { DeveloperRepository } from 'src/repository/developer.repository';
import { DeveloperService } from 'src/services/developer.service';

@Module({
  imports: [],
  controllers: [DeveloperController],
  providers: [DeveloperService, DeveloperRepository],
})
export class DeveloperpModule {}

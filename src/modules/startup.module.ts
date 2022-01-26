import { Module } from '@nestjs/common';
import { StartupRepository } from 'src/repository/startup.repository';
import { StartupService } from 'src/services/startup.service';
import { StartupController } from '../controllers/startup.controller';

@Module({
  imports: [],
  controllers: [StartupController],
  providers: [StartupService, StartupRepository],
})
export class StartupModule {}

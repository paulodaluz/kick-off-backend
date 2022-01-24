import { Module } from '@nestjs/common';
import { StartupController } from '../controllers/startup.controller';

@Module({
  imports: [],
  controllers: [StartupController],
  providers: [],
})
export class StartupModule {}

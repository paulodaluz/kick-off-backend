import { Module } from '@nestjs/common';
import { StartupRepository } from 'src/repository/startup.repository';
import { UserService } from 'src/services/startup.service';
import { StartupController } from '../controllers/startup.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [StartupController],
  providers: [UserService, StartupRepository],
})
export class StartupModule {}

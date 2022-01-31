import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers/health.controller';
import { RequirementModule } from './modules/requirement.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TerminusModule,
    UserModule,
    RequirementModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers/health.controller';
import { InvestorModule } from './modules/Investor.module';
import { StartupModule } from './modules/startup.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TerminusModule,
    StartupModule,
    InvestorModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}

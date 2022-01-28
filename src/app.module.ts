import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DeveloperpModule } from './modules/developer.module';
import { InvestorModule } from './modules/Investor.module';
import { StartupModule } from './modules/startup.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    StartupModule,
    InvestorModule,
    DeveloperpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

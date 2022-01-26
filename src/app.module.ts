import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StartupModule } from './modules/startup.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    StartupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

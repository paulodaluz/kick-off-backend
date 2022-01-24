import { Module } from '@nestjs/common';
import { StartupModule } from './modules/startup.module';

@Module({
  imports: [StartupModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

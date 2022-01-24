import { Module } from '@nestjs/common';
import { StartupModule } from './modules/user.module';

@Module({
  imports: [StartupModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { RequirementController } from '../controllers/requirement.controller';

@Module({
  imports: [],
  controllers: [RequirementController],
  providers: [],
})
export class UserModule {}

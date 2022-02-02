import { Module } from '@nestjs/common';
import { RequirementRepository } from '../repository/requeriment.repository';
import { UserRepository } from '../repository/user.repository';
import { RequirementService } from '../services/requirement.service';
import { RequirementController } from '../controllers/requirement.controller';

@Module({
  imports: [],
  controllers: [RequirementController],
  providers: [RequirementService, RequirementRepository, UserRepository],
})
export class RequirementModule {}

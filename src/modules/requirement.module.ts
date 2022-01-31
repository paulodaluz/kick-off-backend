import { Module } from '@nestjs/common';
import { RequirementRepository } from 'src/repository/requeriment.repository';
import { UserRepository } from 'src/repository/user.repository';
import { RequirementService } from 'src/services/requirement.service';
import { RequirementController } from '../controllers/requirement.controller';

@Module({
  imports: [],
  controllers: [RequirementController],
  providers: [RequirementService, RequirementRepository, UserRepository],
})
export class RequirementModule {}

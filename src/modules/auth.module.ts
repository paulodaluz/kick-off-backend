import { Module } from '@nestjs/common';
import { RequirementRepository } from '../repository/requeriment.repository';
import { UserRepository } from '../repository/user.repository';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, RequirementRepository, UserRepository],
})
export class AuthModule {}

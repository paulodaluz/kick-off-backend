import { Module } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}

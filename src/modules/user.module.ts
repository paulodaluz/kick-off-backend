import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { JWTValidation } from '../middlewares/jwt.middleware';
import { RequirementRepository } from '../repository/requeriment.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, RequirementRepository, UserRepository],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JWTValidation)
      .forRoutes(UserController);
  }
}

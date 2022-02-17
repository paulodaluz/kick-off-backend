import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { JWTValidation } from '../middlewares/jwt.middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JWTValidation)
      .forRoutes(UserController);
  }
}

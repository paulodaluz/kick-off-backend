import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NotificationService } from '../services/notifications.service';
import { RequirementRepository } from '../repository/requeriment.repository';
import { UserRepository } from '../repository/user.repository';
import { RequirementService } from '../services/requirement.service';
import { RequirementController } from '../controllers/requirement.controller';
import { JWTValidation } from '../middlewares/jwt.middleware';

@Module({
  imports: [],
  controllers: [RequirementController],
  providers: [RequirementService, NotificationService, RequirementRepository, UserRepository],
})
export class RequirementModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTValidation).forRoutes(RequirementController);
  }
}

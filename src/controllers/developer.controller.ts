import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { DeveloperService } from 'src/services/developer.service';
import { RegisterDeveloperValidator } from 'src/validators/developer.validator';

@Controller('developer')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Post('register')
  async registerInvestor(
    @Body(new ValidationPipe()) body: RegisterDeveloperValidator,
  ): Promise<void> {
    return await this.developerService.registerDeveloper(body);
  }
}

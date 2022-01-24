import { Body, Controller, Delete, Get, Post, Put, ValidationPipe } from '@nestjs/common';
import { UserService } from 'src/services/startup.service';
import { RegisterStartupValidator } from '../validators/startup.validator';

@Controller('startup')
export class StartupController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createStartup(@Body(new ValidationPipe()) body: RegisterStartupValidator): Promise<void> {
    return await this.userService.createStartup(body);
  }

  @Get()
  getStartup(): string {
    return 'Olá Mundo';
  }

  @Put()
  updateStartup(): string {
    return 'Olá Mundo';
  }

  @Delete()
  deleteStartup(): string {
    return 'Olá Mundo';
  }
}

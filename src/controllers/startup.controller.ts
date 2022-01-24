import { Body, Controller, Delete, Get, Post, Put, ValidationPipe } from '@nestjs/common';
import { RegisterStartupValidator } from '../validators/startup.validator';

@Controller()
export class StartupController {
  constructor() {}

  @Post()
  createStartup(@Body(new ValidationPipe()) body: RegisterStartupValidator): string {
    return 'Olá Mundo';
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

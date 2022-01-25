import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { Startup } from 'src/interfaces/startup.interface';
import { StartupService } from 'src/services/startup.service';
import { RegisterStartupValidator } from '../validators/startup.validator';

@Controller('startup')
export class StartupController {
  constructor(private readonly startupService: StartupService) {}

  @Post('register')
  async createStartup(@Body(new ValidationPipe()) body: RegisterStartupValidator): Promise<void> {
    return await this.startupService.createStartup(body);
  }

  @Get('get-infos/:identifier')
  async getStartup(@Param('identifier') identifier: string): Promise<Startup> {
    return await this.startupService.getStartupInfos(identifier);
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

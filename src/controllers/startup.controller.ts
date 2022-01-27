import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { Startup } from 'src/interfaces/startup.interface';
import { StartupService } from 'src/services/startup.service';
import { RegisterStartupValidator } from '../validators/startup.validator';

@Controller('startup')
export class StartupController {
  constructor(private readonly startupService: StartupService) {}

  @Post('register')
  async registerStartup(@Body(new ValidationPipe()) body: RegisterStartupValidator): Promise<void> {
    return await this.startupService.registerStartup(body);
  }

  @Get('get-infos/:identifier')
  async getStartup(@Param('identifier') identifier: string): Promise<Startup> {
    return await this.startupService.getStartupInfos(identifier);
  }

  @Put('update-info/:identifier')
  async updateStartup(
    @Param('identifier') identifier: string,
    @Body() body: Startup,
  ): Promise<void> {
    return await this.startupService.updateStartup(identifier, body);
  }

  @Delete('delete-startup/:identifier')
  async deleteStartup(@Param('identifier') identifier: string): Promise<void> {
    return await this.startupService.deleteStartup(identifier);
  }
}

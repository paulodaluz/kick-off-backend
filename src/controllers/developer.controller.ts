import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { Developer } from 'src/interfaces/dev.interface';
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

  @Get('get-infos/:identifier')
  async getInvestor(@Param('identifier') identifier: string): Promise<Developer> {
    return await this.developerService.getDeveloper(identifier);
  }

  @Put('update-info/:identifier')
  async updateInvestor(
    @Param('identifier') identifier: string,
    @Body() body: Developer,
  ): Promise<void> {
    return await this.developerService.updateDeveloper(identifier, body);
  }

  @Delete('delete-user/:identifier')
  async deleteInvestor(@Param('identifier') identifier: string): Promise<void> {
    return await this.developerService.deleteDeveloper(identifier);
  }
}

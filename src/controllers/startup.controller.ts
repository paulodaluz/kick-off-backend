import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerStartup(@Body(new ValidationPipe()) body: User): Promise<void> {
    return await this.userService.registerUser(body);
  }

  /* @Get('get-infos/:identifier')
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
  } */
}

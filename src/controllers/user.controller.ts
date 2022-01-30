import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { UserService } from 'src/services/user.service';
import { RegisterUserValidator } from 'src/validators/user.validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body(new ValidationPipe()) body: RegisterUserValidator): Promise<void> {
    return await this.userService.registerUser(body);
  }

  @Get('get-infos/:identifier')
  async getUser(@Param('identifier') identifier: string): Promise<User> {
    return await this.userService.getUserInfos(identifier);
  }

  @Put('update-info/:identifier')
  async updateStartup(@Param('identifier') identifier: string, @Body() body: User): Promise<void> {
    return await this.userService.updateStartup(identifier, body);
  }

  @Delete('delete-infos/:identifier')
  async deleteStartup(@Param('identifier') identifier: string): Promise<void> {
    return await this.userService.deleteStartup(identifier);
  }
}

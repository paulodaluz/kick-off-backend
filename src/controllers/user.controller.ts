import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { RegisterUserValidator, UpdateUserValidator } from '../validators/user.validator';

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
  async updateUser(
    @Param('identifier') identifier: string,
    @Body(new ValidationPipe()) body: UpdateUserValidator,
  ): Promise<void> {
    return await this.userService.updateUser(identifier, body);
  }

  @Delete('delete-infos/:identifier')
  async deleteUser(@Param('identifier') identifier: string): Promise<void> {
    return await this.userService.deleteUser(identifier);
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { UpdateUserValidator } from '../validators/updateUser.validator';
import { User, UuidUserResponseInterface } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { RegisterUserValidator } from '../validators/registerUser.validator';
import { LoginValidator } from '../validators/login.validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body(new ValidationPipe()) body: RegisterUserValidator): Promise<UuidUserResponseInterface> {
    return this.userService.registerUser(body);
  }

  @Post('login')
  async loginUser(@Body(new ValidationPipe()) body: LoginValidator): Promise<UuidUserResponseInterface> {
    return this.userService.login(body);
  }

  @Get('get-infos/:identifier')
  async getUser(@Param('identifier') uuid: string): Promise<User> {
    return this.userService.getUserInfos(uuid);
  }

  @Put('update-info/:identifier')
  async updateUser(
    @Param('identifier') uuid: string,
    @Body(new ValidationPipe()) body: UpdateUserValidator,
  ): Promise<void> {
    return this.userService.updateUser(uuid, body);
  }

  @Delete('delete-infos/:identifier')
  async deleteUser(@Param('identifier') uuid: string): Promise<void> {
    return this.userService.deleteUser(uuid);
  }
}

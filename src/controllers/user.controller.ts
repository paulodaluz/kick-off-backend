import { Body, Controller, Delete, Get, Param, Put, ValidationPipe } from '@nestjs/common';
import { UpdateUserValidator } from '../validators/updateUser.validator';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-infos/:identifier')
  async getUser(@Param('identifier') uuid: string): Promise<User> {
    return this.userService.getUserInfos(uuid);
  }

  @Put('update-info/:identifier')
  async updateUser(
    @Param('identifier') uuid: string,
    @Body(new ValidationPipe()) body: UpdateUserValidator,
  ): Promise<void> {
    await this.userService.updateUser(uuid, body);
  }

  @Delete('delete-infos/:identifier')
  async deleteUser(@Param('identifier') uuid: string): Promise<void> {
    await this.userService.deleteUser(uuid);
  }
}

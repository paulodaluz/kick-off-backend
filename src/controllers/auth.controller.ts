import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UuidUserResponseInterface } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { RegisterUserValidator } from '../validators/registerUser.validator';
import { LoginValidator } from '../validators/login.validator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body(new ValidationPipe()) body: RegisterUserValidator): Promise<UuidUserResponseInterface> {
    return this.authService.registerUser(body);
  }

  @Post('login')
  async loginUser(@Body(new ValidationPipe()) body: LoginValidator): Promise<UuidUserResponseInterface> {
    return this.authService.login(body);
  }
}

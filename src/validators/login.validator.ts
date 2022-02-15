import { IsString, IsEmail } from 'class-validator';
import { UserLogin } from '../interfaces/user.interface';

export class LoginValidator implements UserLogin {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

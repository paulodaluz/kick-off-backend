import { IsString, IsEmail, IsUUID, IsNumber } from 'class-validator';

export class RegisterUserValidator {
  @IsUUID()
  uuid: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;
}

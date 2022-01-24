import { IsString, IsEmail, IsUUID, IsNumber } from 'class-validator';
import { Startup } from '../interfaces/startup.interface';

export class RegisterStartupValidator implements Startup {
  @IsUUID()
  uuid: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  workers: string;

  @IsNumber()
  requiredValue: number;

  @IsString()
  descriptionOfMonetaryReturn: string;
}

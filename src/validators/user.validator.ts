import { IsString, IsEmail, IsUUID, IsOptional, IsArray, IsEnum } from 'class-validator';
import { User } from '../interfaces/user.interface';

enum typeOfUserEnum {
  startup,
  developer,
  investor,
}

export class RegisterUserValidator implements User {
  @IsUUID()
  uuid: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsEnum(typeOfUserEnum)
  typeOfUser: 'startup' | 'developer' | 'investor';

  @IsString()
  @IsOptional()
  cnpj: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  workers: string;

  @IsArray()
  @IsOptional()
  developerRequirements: Array<string>;

  @IsArray()
  @IsOptional()
  InvestRequirement: Array<string>;

  @IsString()
  @IsOptional()
  cpf: string;

  @IsArray()
  @IsOptional()
  investedStartups: Array<string>;

  @IsArray()
  @IsOptional()
  workInProgress: Array<string>;
}

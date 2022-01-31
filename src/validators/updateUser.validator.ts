import { IsString, IsEmail, IsUUID, IsOptional, IsArray, IsEnum } from 'class-validator';
import { TypeOfUserEnum, User } from '../interfaces/user.interface';

export class UpdateUserValidator implements User {
  @IsUUID()
  @IsOptional()
  uuid: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsEnum(TypeOfUserEnum)
  @IsOptional()
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
  investmentRequirements: Array<string>;

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

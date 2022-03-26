import { IsString, IsEmail, IsOptional, IsArray, IsEnum, IsNumber } from 'class-validator';
import { TypeOfUserEnum, User } from '../interfaces/user.interface';

export class UpdateUserValidator implements Partial<User> {
  @IsOptional()
  @IsString()
  uuid?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsEnum(TypeOfUserEnum)
  @IsOptional()
  typeOfUser?: 'startup' | 'developer' | 'investor';

  @IsString()
  @IsOptional()
  cnpj?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  managingPartners?: string;

  @IsNumber()
  @IsOptional()
  numberOfWorkers?: number;

  @IsArray()
  @IsOptional()
  developerRequirements?: Array<string>;

  @IsArray()
  @IsOptional()
  investmentRequirements?: Array<string>;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsArray()
  @IsOptional()
  investedStartups?: Array<string>;

  @IsArray()
  @IsOptional()
  workInProgress?: Array<string>;
}

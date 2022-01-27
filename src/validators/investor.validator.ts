import { IsString, IsEmail, IsUUID, IsNumber, IsOptional } from 'class-validator';
import { Investor } from '../interfaces/investor.interface';

export class RegisterInvestorValidator implements Investor {
  @IsUUID()
  uuid: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  investedMoney?: number;
}

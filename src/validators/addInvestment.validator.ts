import { IsString } from 'class-validator';

export class AddInvestmentValidator {
  @IsString()
  uuidByCustomer: string;

  @IsString()
  uuidByRequirement: string;

  @IsString()
  uuidByStartupProprietress: string;
}

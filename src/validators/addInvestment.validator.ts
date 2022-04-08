import { IsString, IsUUID } from 'class-validator';

export class AddInvestmentValidator {
  @IsString()
  @IsUUID()
  uuidByCustomer: string;

  @IsString()
  @IsUUID()
  uuidByRequirement: string;

  @IsString()
  @IsUUID()
  uuidByStartupProprietress: string;
}

import { IsString, IsUUID } from 'class-validator';

export class AssessCustomerInteractionValidator {
  @IsString()
  @IsUUID()
  uuidByCustomer: string;

  @IsString()
  @IsUUID()
  uuidByRequirement: string;

  @IsString()
  @IsUUID()
  uuidByStartupProprietress: string;

  @IsString()
  @IsUUID()
  notificationId: string;
}

import { IsString } from 'class-validator';

export class AssessCustomerInteractionValidator {
  @IsString()
  uuidByCustomer: string;

  @IsString()
  uuidByRequirement: string;

  @IsString()
  uuidByStartupProprietress: string;

  @IsString()
  notificationId: string;

  @IsString()
  interactionStatus: 'accept' | 'reject';
}

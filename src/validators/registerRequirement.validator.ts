import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { Requirement , TypeOfRequirementEnum } from '../interfaces/requirement.interface';


export class RegisterRequirementValidator implements Requirement {
  @IsOptional()
  @IsString()
  uuid: string;

  @IsEnum(TypeOfRequirementEnum)
  typeOfRequirement: 'development' | 'investment';

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  languagesOfDevelop: string;

  @IsNumber()
  @IsOptional()
  payment: number;

  @IsNumber()
  @IsOptional()
  requiredMoney: number;

  @IsNumber()
  @IsOptional()
  obtainedMoney: number;

  @IsString()
  @IsOptional()
  descriptionOfMoneryReturn: string;
}

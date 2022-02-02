import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { Requirement } from '../interfaces/requirement.interface';
import { RegisterRequirementValidator } from '../validators/registerRequirement.validator';
import { RequirementService } from '../services/requirement.service';

@Controller('requirement')
export class RequirementController {
  constructor(private readonly requirementService: RequirementService) {}

  @Post('register')
  async registerRequirement(
    @Headers('identifier') uuid: string,
    @Body(new ValidationPipe()) body: RegisterRequirementValidator,
  ): Promise<void> {
    return this.requirementService.registerRequirement(uuid, body);
  }

  @Post('get-infos')
  async getRequirementsByUser(@Body() body: Array<string>): Promise<Array<Requirement>> {
    return await this.requirementService.getRequirementsByUuid(body);
  }

  @Get('active-requirements')
  async getRequirementsOpened(
    @Headers('typeOfRequirement') typeOfRequirement: 'development' | 'investment',
  ): Promise<Array<Requirement>> {
    return this.requirementService.getRequirementsByType(typeOfRequirement);
  }

  @Patch('add-investment/:identifier')
  async addInvestmentInOneRequirement(): Promise<void> {
    // Recebe um valor e qual o uuid do requerimento
  }

  @Put('update-info/:identifier')
  async updateRequirements(): Promise<void> {}

  @Delete('delete-infos/requirement/:requirement/startup/:startup')
  async deletarRequerimento(
    @Param('requirement') uuidByRequirement: string,
    @Param('startup') uuidByStatup: string,
  ): Promise<void> {
    return await this.requirementService.deleteRequirement(uuidByRequirement, uuidByStatup);
  }
}

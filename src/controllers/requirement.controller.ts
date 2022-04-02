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
import { UpdateRequirementValidator } from '../validators/updateRequirement.validator';

@Controller('requirement')
export class RequirementController {
  constructor(private readonly requirementService: RequirementService) {}

  @Post('register')
  async registerRequirement(
    @Headers('identifier') uuid: string,
    @Body(new ValidationPipe()) body: RegisterRequirementValidator,
  ): Promise<void> {
    await this.requirementService.registerRequirement(uuid, body);
  }

  @Post('get-infos')
  async getRequirementsByUser(@Body() body: Array<string>): Promise<Array<Requirement>> {
    return this.requirementService.getRequirementsByUuid(body);
  }

  @Get('active-requirements')
  async getRequirementsOpened(
    @Headers('typeOfRequirement') typeOfRequirement: 'development' | 'investment',
  ): Promise<Array<Requirement>> {
    return this.requirementService.getRequirementsByType(typeOfRequirement);
  }

  @Patch('add-investment/requirement/:requirement/customer/:customer')
  async linkRequirementToCustomer(
    @Param('requirement') uuidByRequirement: string,
    @Param('customer') uuidByCustomer: string,
    @Body('uuidByStartupProprietress') uuidByStartupProprietress: string,
  ): Promise<void> {
    await this.requirementService.linkRequirementToCustomer(
      uuidByRequirement,
      uuidByCustomer,
      uuidByStartupProprietress,
    );
  }

  @Put('update-info/requirement/:identifier')
  async updateRequirements(
    @Param('identifier') uuidByRequirement: string,
    @Body(new ValidationPipe()) body: UpdateRequirementValidator,
  ): Promise<void> {
    await this.requirementService.updateRequirement(uuidByRequirement, body);
  }

  @Delete('delete-infos/requirement/:requirement/startup/:startup')
  async deletarRequerimento(
    @Param('requirement') uuidByRequirement: string,
    @Param('startup') uuidByStatup: string,
  ): Promise<void> {
    await this.requirementService.deleteRequirement(uuidByRequirement, uuidByStatup);
  }
}

import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Put } from '@nestjs/common';
import { Requirement } from 'src/interfaces/requirement.interface';
import { RequirementService } from '../services/requirement.service';

@Controller('requirement')
export class RequirementController {
  constructor(private readonly requirementService: RequirementService) {}

  @Post('register')
  async registerRequirement(
    @Headers('identifier') identifier: string,
    @Body() body: Requirement,
  ): Promise<void> {
    return this.requirementService.registerRequirement(identifier, body);
  }

  @Get('get-infos/:identifier')
  async getRequirementsByUser(@Param('identifier') identifier: string): Promise<string> {
    // Recebe um array com todos requerimentos
    return identifier;
  }

  @Get('active-requirements')
  async getRequirementsOpened(
    @Headers('typeOfRequirement') typeOfRequirement: 'developer' | 'investor',
  ): Promise<string> {
    return typeOfRequirement;
  }

  @Patch('add-investment/:identifier')
  async addInvestmentInOneRequirement(): Promise<void> {
    // Recebe um valor e qual o uuid do requerimento
  }

  @Put('update-info/:identifier')
  async updateRequirements(): Promise<void> {}

  @Delete('delete-infos/:identifier')
  async deletarRequerimento(@Param('identifier') identifier: string): Promise<void> {
    console.log(identifier);
  }
}

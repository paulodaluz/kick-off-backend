import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('requirement')
export class RequirementController {
  constructor() {}

  @Post('register')
  async registerRequirement(): Promise<void> {}

  @Get('get-infos/:identifier')
  async getRequirementsByUser(@Param('identifier') identifier: string): Promise<string> {
    // Recebe um array com todos requerimentos
    return 'ok';
  }

  @Patch('add-investment/:identifier')
  async addInvestmentInOneRequirement(): Promise<void> {
    // Recebe um valor e qual o uuid do requerimento
  }

  @Put('update-info/:identifier')
  async updateRequirements(): Promise<void> {}

  @Delete('delete-infos/:identifier')
  async deletarRequerimento(@Param('identifier') identifier: string): Promise<void> {}
}

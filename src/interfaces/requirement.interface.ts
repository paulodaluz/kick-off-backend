export interface DeveloperRequirement {
  languagesOfDevelop: string;
  payment: number;
}

export interface InvestmentRequirement {
  requiredMoney: number;
  obtainedMoney: number;
  partnerParticipation: string;
}

export enum TypeOfRequirementEnum {
  development,
  investment,
}

export interface Requirement extends DeveloperRequirement, InvestmentRequirement {
  uuid: string;
  typeOfRequirement: 'development' | 'investment';
  description: string;
  creationDate: string;
  status: 'opened' | 'concluded';
  createdBy?: string;
  descriptionOfStartup?: string;
}

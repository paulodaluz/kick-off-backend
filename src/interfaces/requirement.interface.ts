export interface DeveloperRequirement {
  languagesOfDevelop: string;
  payment: number;
}

export interface InvestmentRequirement {
  requiredMoney: number;
  obtainedMoney: number;
  partnerparticipation: number;
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
}

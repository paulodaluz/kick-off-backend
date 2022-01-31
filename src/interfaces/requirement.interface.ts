export interface Requirement extends DeveloperRequirement, InvestmentRequirement {
  uuid: string;
  typeOfRequirement: 'development' | 'investment';
  description: string;
}

export interface DeveloperRequirement {
  languagesOfDevelop: Array<string>;
  payment: number;
}

export interface InvestmentRequirement {
  uuid: string;
  requiredMoney: number;
  obtainedMoney: string;
  descriptionOfMoneryReturn: string;
}

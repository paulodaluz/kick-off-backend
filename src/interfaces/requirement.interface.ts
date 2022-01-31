export interface DeveloperRequirement {
  languagesOfDevelop: Array<string>;
  payment: number;
}

export interface InvestmentRequirement {
  requiredMoney: number;
  obtainedMoney: string;
  descriptionOfMoneryReturn: string;
}

export interface Requirement extends DeveloperRequirement, InvestmentRequirement {
  uuid: string;
  typeOfRequirement: 'development' | 'investment';
  description: string;
}

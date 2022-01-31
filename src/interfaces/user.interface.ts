export interface Startup {
  cnpj: string;
  description: string;
  workers: string;
  developerRequirements: Array<string>;
  investmentRequirements: Array<string>;
}

export interface Investor {
  cpf: string;
  investedStartups: Array<string>;
}

export interface Developer {
  cpf: string;
  workInProgress: Array<string>;
}

export enum TypeOfUserEnum {
  startup,
  developer,
  investor,
}

export interface User extends Startup, Investor, Developer {
  uuid: string;
  email: string;
  name: string;
  phoneNumber: string;
  typeOfUser: 'startup' | 'developer' | 'investor';
}

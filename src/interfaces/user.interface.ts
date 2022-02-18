import { Requirement } from "./requirement.interface";

export interface Startup {
  uuid: string;
  cnpj: string;
  name: string;
  description: string;
  managingPartners: string;
  numberOfWorkers: number;
  developerRequirements?: Array<string|Requirement>;
  investmentRequirements?: Array<string|Requirement>;
  investmentRaised?: number;
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
  password: string;
}

export interface AuthResponseInterface {
  uuid: string;
  token: string;
  typeOfUser?: 'startup' | 'developer' | 'investor';
}

export interface UserLogin {
  email: string;
  password: string;
}

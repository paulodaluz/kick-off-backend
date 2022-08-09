import { Requirement } from './requirement.interface';

export interface Startup {
  uuid: string;
  cnpj: string;
  name: string;
  description: string;
  managingPartners: string;
  numberOfWorkers: number;
  developerRequirements: Array<string>;
  investmentRequirements: Array<string>;
  requirements?: Array<Requirement>;
  investmentRaised?: number;
}

export interface Investor {
  cpf: string;
  investedStartups: Array<string>;
  requirementsWaitingApproval: Array<string>;
}

export interface Developer {
  cpf: string;
  workInProgress: Array<string>;
  requirementsWaitingApproval: Array<string>;
  aboutMe: string;
  experience: {
    jobRole: string;
    company: string;
    tempo: string;
  };
  formation: {
    course: string;
    institution: string;
    duration: string;
  };
  skill: Array<string>;
  languages: Array<string>;
  github: {
    user: string;
    charge: string;
  };
  linkedin: {
    user: string;
    charge: string;
  };
}

export enum TypeOfUserEnum {
  startup,
  developer,
  investor,
}

export interface Notification {
  id: string;
  message: string;
  trigger: string; // Disparador
  uuidTarget?: string; // Requirement
  creationDate: string;
  createdSomeTimeAgo?: string;
}

export interface User extends Startup, Investor, Developer {
  uuid: string;
  email: string;
  name: string;
  phoneNumber: string;
  typeOfUser: 'startup' | 'developer' | 'investor';
  password: string;
  oldPassword?: string;
  newPassword?: string;
  notifications: Array<Notification>;
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

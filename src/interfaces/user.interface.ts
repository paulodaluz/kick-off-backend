import { Developer } from './dev.interface';
import { Investor } from './investor.interface';
import { Startup } from './startup.interface';

export interface User extends Startup, Investor, Developer {
  uuid: string;
  email: string;
  name: string;
  phoneNumber: string;
  typeOfUser: 'startup' | 'developer' | 'investor';
}

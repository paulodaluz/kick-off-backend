import { User } from '../interfaces/user.interface';
import { Requirement } from '../interfaces/requirement.interface';

export class Utils {
  public static avoidIncorrectUserUpdate(user: Partial<User>): void {
    if (user.email) {
      Reflect.deleteProperty(user, 'email');
    }

    if (user.uuid) {
      Reflect.deleteProperty(user, 'uuid');
    }

    if (user.typeOfUser) {
      Reflect.deleteProperty(user, 'typeOfUser');
    }
  }

  public static avoidIncorrectRequirementUpdate(requirement: Partial<Requirement>): void {
    if (requirement.uuid) {
      Reflect.deleteProperty(requirement, 'uuid');
    }

    if (requirement.typeOfRequirement) {
      Reflect.deleteProperty(requirement, 'typeOfRequirement');
    }
  }
}

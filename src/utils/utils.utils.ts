import { User } from '../interfaces/user.interface';
import { Requirement } from '../interfaces/requirement.interface';

export class Utils {
  public static avoidIncorrectUserUpdate(user: Partial<User>): void {
    if (user.email) {
      delete user.email;
    }

    if (user.uuid) {
      delete user.uuid;
    }

    if (user.typeOfUser) {
      delete user.typeOfUser;
    }
  }

  public static avoidIncorrectRequirementUpdate(requirement: Partial<Requirement>): void {
    if (requirement.uuid) {
      delete requirement.uuid;
    }

    if (requirement.typeOfRequirement) {
      delete requirement.typeOfRequirement;
    }
  }
}

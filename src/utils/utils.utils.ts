import { User } from '../interfaces/user.interface';
import { Requirement } from '../interfaces/requirement.interface';
import { ErrorUtils } from './error.utils';

const bcrypt = require('bcrypt');

export class Utils {
  public static avoidIncorrectUserUpdate(user: Partial<User>): void {
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

  public static orderRequirementsByDate(requirements: Array<Requirement>): Array<Requirement> {
    return requirements.sort(
      (reqOne, reqTwo) =>
        new Date(reqOne.creationDate).getTime() - new Date(reqTwo.creationDate).getTime(),
    );
  }

  public static encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;

    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err: any, hash: string) => {
        if (err) reject(ErrorUtils.throwSpecificError(500));

        resolve(hash);
      });
    });
  }

  public static verifyPassword(password: string, hashPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashPassword, (err: any, result: boolean) => {
        if (err) reject(ErrorUtils.throwSpecificError(500));

        resolve(result);
      });
    });
  }
}

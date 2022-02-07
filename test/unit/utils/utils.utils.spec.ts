import { Requirement } from '../../../src/interfaces/requirement.interface';
import { User } from '../../../src/interfaces/user.interface';
import { Utils } from '../../../src/utils/utils.utils';

describe('Test Utils', () => {
  it('should remove e-mail, typeOfUser and uuid by object on function avoidIncorrectUserUpdate', () => {
    const user = {
      email: 'email@email.com',
      uuid: 'c8a35dda-8867-11ec-a8a3-0242ac120002',
      typeOfUser: 'developer'
    }

    Utils.avoidIncorrectUserUpdate(user as User);

    expect(user.email).toBe(undefined);
    expect(user.uuid).toBe(undefined);
    expect(user.typeOfUser).toBe(undefined);
  });

  it('should remove e-mail, typeOfUser and uuid by object on function avoidIncorrectRequirementUpdate', () => {
    const requirement = {
      uuid: 'c8a35dda-8867-11ec-a8a3-0242ac120002',
      obtainedMoney: 10000,
      typeOfRequirement: 'development'
    }

    Utils.avoidIncorrectRequirementUpdate(requirement as Requirement);

    expect(requirement.obtainedMoney).toBe(undefined);
    expect(requirement.uuid).toBe(undefined);
    expect(requirement.typeOfRequirement).toBe(undefined);
  });
});

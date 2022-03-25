import { Requirement } from '../../../src/interfaces/requirement.interface';
import { Utils } from '../../../src/utils/utils.utils';

describe('Test Utils', () => {
  it('should remove e-mail, typeOfUser and uuid by object on function avoidIncorrectRequirementUpdate', () => {
    const requirement = {
      uuid: 'c8a35dda-8867-11ec-a8a3-0242ac120002',
      obtainedMoney: 10000,
      typeOfRequirement: 'development',
    };

    Utils.avoidIncorrectRequirementUpdate(requirement as Requirement);

    expect(requirement.obtainedMoney).toBe(10000);
    expect(requirement.uuid).toBe(undefined);
    expect(requirement.typeOfRequirement).toBe(undefined);
  });

  it('should remove e-mail, typeOfUser and uuid by object on function avoidIncorrectRequirementUpdate 2', () => {
    const requirement = {
      uuid: 'c8a35dda-8867-11ec-a8a3-0242ac120002',
      typeOfRequirement: 'development',
    };

    Utils.avoidIncorrectRequirementUpdate(requirement as Requirement);

    expect(requirement.uuid).toBe(undefined);
    expect(requirement.typeOfRequirement).toBe(undefined);
  });
});

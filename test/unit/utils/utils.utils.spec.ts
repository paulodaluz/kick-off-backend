import { User } from 'src/interfaces/user.interface';
import { Requirement } from '../../../src/interfaces/requirement.interface';
import { Utils } from '../../../src/utils/utils.utils';

const bcrypt = require('bcrypt');

describe('Test Utils', () => {
  it(`should remove obtainedMoney, typeOfRequirement and
      uuid by object on function avoidIncorrectRequirementUpdate`, () => {
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

  it('should remove itens by object on function avoidIncorrectUserUpdate', () => {
    const user = {
      uuid: 'c8a35dda-8867-11ec-a8a3-0242ac1200',
      typeOfUser: 'startup',
      password: 'senha123',
    };

    Utils.avoidIncorrectUserUpdate(user as User);

    expect(user.password).toBe(undefined);
    expect(user.typeOfUser).toBe(undefined);
    expect(user.uuid).toBe(undefined);
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

  it('should return a encrypted password', async () => {
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation((_pass, _salt, cb: any) => cb(null, 'hashPassword'));

    const response = await Utils.encryptPassword('senha123');

    expect(response).toBe('hashPassword');
  });

  it('should return a error on encrypted password', async () => {
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation((_pass, _salt, cb: any) => cb('Não foi possivel encryptar', null));

    try {
      await Utils.encryptPassword('senha123');
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.response).toBe('Unknown server error. Typically a server bug.');
      expect(error.message).toBe('Unknown server error. Typically a server bug.');
    }
  });

  it('should return success on verifyPassword - true', async () => {
    const response = await Utils.verifyPassword(
      'senha123',
      '$2b$10$XuNIk8RmUvRH6Y5qBSABpunyLa1M8IaBypOYyVNUZBrVQlYEdLv6i',
    );

    expect(response).toBe(true);
  });

  it('should return success on verifyPassword - false', async () => {
    const response = await Utils.verifyPassword('senha123', 'xxx');

    expect(response).toBe(false);
  });

  it('should return a error on verifyPassword', async () => {
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation((_pass, _salt, cb: any) =>
        cb('Não foi possivel verificar a senha', null),
      );

    try {
      await Utils.verifyPassword('senha123', 'xxx');
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.response).toBe('Unknown server error. Typically a server bug.');
      expect(error.message).toBe('Unknown server error. Typically a server bug.');
    }
  });

  it('should return 2 minuts', async () => {
    const dateOfCreation = new Date(
      'Fri Feb 26 2022 23:46:15 GMT+0000 (Coordinated Universal Time)',
    );
    const now = new Date('Fri Feb 26 2022 23:48:15 GMT+0000 (Coordinated Universal Time)');

    const response = Utils.calcHowMuchTimeWasSendNotification(dateOfCreation, now);

    expect(response).toBe('2 minutos atrás');
  });

  it('should return 2 hours', async () => {
    const dateOfCreation = new Date(
      'Fri Feb 26 2022 21:46:15 GMT+0000 (Coordinated Universal Time)',
    );
    const now = new Date('Fri Feb 26 2022 23:46:15 GMT+0000 (Coordinated Universal Time)');

    const response = Utils.calcHowMuchTimeWasSendNotification(dateOfCreation, now);

    expect(response).toBe('2 horas atrás');
  });

  it('should return 2 days', async () => {
    const dateOfCreation = new Date(
      'Fri Feb 26 2022 23:46:15 GMT+0000 (Coordinated Universal Time)',
    );
    const now = new Date('Fri Feb 28 2022 23:46:15 GMT+0000 (Coordinated Universal Time)');

    const response = Utils.calcHowMuchTimeWasSendNotification(dateOfCreation, now);

    expect(response).toBe('2 dias atrás');
  });
});

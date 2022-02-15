import { createUserWithEmailAndPassword } from 'firebase/auth';
import { User } from '../../../src/interfaces/user.interface';
import { UserRepository } from '../../../src/repository/user.repository';
import { UserService } from '../../../src/services/user.service';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

describe('UserService test', () => {
  it('should return success by service UserService on operation registerUser', async () => {
    userRepository.getUserByEmail = jest.fn().mockResolvedValue(null);
    userRepository.registerUser = jest.fn().mockImplementation();

    const user = {
      "email": "testao12113@gmail.com",
      "name": "Falcão",
      "managingPartners": "Paulo da Luz e Leonardo",
      "numberOfWorkers": 33,
      "typeOfUser": "startup",
      "phoneNumber": "(54) 99108-3039",
      "cnpj": "98.828.768/0001-52",
      "password": "senha123"
    }

    const result = await userService.registerUser(user as User);

    expect(typeof result.uuid).toBe('string');
  });

});

import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { ErrorUtils } from '../utils/error.utils';
import { Startup, User, UserLogin, AuthResponseInterface } from '../interfaces/user.interface';
import { UtilsValidations } from '../utils/validation.utils';
import { v4 as uuidv4 } from 'uuid';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  private className = 'AuthService';

  constructor(private readonly userRepository: UserRepository) {}

  public async registerUser(user: User): Promise<AuthResponseInterface> {
    Logger.log(`user = ${JSON.stringify(user.name)}`, `${this.className} - ${this.registerUser.name}`);
    const registerExists = await this.userRepository.getUserByEmail(user.email);

    if (registerExists && registerExists.uuid) {
      Logger.error(`user = ${user.name} - ERROR = User already exists`,
        `${this.className} - ${this.registerUser.name}`,
      );

      ErrorUtils.throwSpecificError(400);
    }

    if (user.typeOfUser === 'startup') {
      this.validateCompany(user);
    }

    user.uuid = uuidv4();

    await this.userRepository.registerUser(user);

    const token = this.privateGenerateToken(user.uuid, user.email);

    return { uuid: user.uuid, token };
  }

  public async login(userToAuth: UserLogin): Promise<AuthResponseInterface> {
    Logger.log(`email = ${userToAuth.email}`, `${this.className} - ${this.login.name}`);

    const user = await this.userRepository.getUserByEmail(userToAuth.email);

    if (!user || user.password !== userToAuth.password) {
      Logger.error(`email = ${userToAuth.email} - ERROR = User not found`,
        `${this.className} - ${this.login.name}`,
      );

      ErrorUtils.throwSpecificError(403);
    }

    const token = this.privateGenerateToken(user.uuid, userToAuth.email);

    return { uuid: user.uuid, token, typeOfUser: user.typeOfUser };
  }

  private validateCompany(startup: Startup): void {
    if (!UtilsValidations.isCnpj(startup.cnpj)) {
      Logger.error(`startup = ${startup.name} - ERROR = Invalid CNPJ`,
        `${this.className} - ${this.validateCompany.name}`,
      );

      ErrorUtils.throwSpecificError(400);
    }
  }

  privateGenerateToken(uuid: string, email: string): string {
    return jwt.sign({
        uuid,
        email
      }, process.env.SECRET_KEY_TO_JWT_TOKEN, { algorithm: 'HS512' }
    );
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '../repository/user.repository';
import { ErrorUtils } from '../utils/error.utils';
import { Startup, User, UserLogin, AuthResponseInterface, Developer, Investor } from '../interfaces/user.interface';
import { UtilsValidations } from '../utils/validation.utils';

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

    switch (user.typeOfUser) {
			case 'startup':
				this.validateStartup(user);
        break;
			case 'investor':
				this.validateInvestor(user);
        break;
			case 'developer':
				this.validateDeveloper(user);
        break;
      default:
        ErrorUtils.throwSpecificError(400);
		}

    user.uuid = uuidv4();

    await this.userRepository.registerUser(user);

    const token = this.generateToken(user.uuid, user.email);

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

    const token = this.generateToken(user.uuid, userToAuth.email);

    return { uuid: user.uuid, token, typeOfUser: user.typeOfUser };
  }

  private validateStartup(startup: Startup): void {
    if (!UtilsValidations.isCnpj(startup.cnpj)) {
      Logger.error(`startup = ${startup.name} - ERROR = Invalid CNPJ`,
        `${this.className} - ${this.validateStartup.name}`,
      );

      ErrorUtils.throwSpecificError(400);
    }

    startup.developerRequirements = [];
    startup.investmentRequirements = [];
  }

  private validateDeveloper(developer: Developer): void {
    developer.workInProgress = [];
  }

  private validateInvestor(investor: Investor): void {
    investor.investedStartups = [];
  }

  private generateToken(uuid: string, email: string): string {
    return jwt.sign({
        uuid,
        email
      }, process.env.SECRET_KEY_TO_JWT_TOKEN, { algorithm: 'HS512' }
    );
  }
}

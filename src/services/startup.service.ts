import { Injectable, Logger } from '@nestjs/common';
import { StartupRepository } from '../repository/startup.repository';
import { Startup } from '../interfaces/startup.interface';
import { ErrorUtils } from '../utils/error.utils';

@Injectable()
export class StartupService {
  private className = 'StartupService';

  constructor(private readonly startupRepository: StartupRepository) {}

  public async createStartup(startup: Startup): Promise<void> {
    Logger.log(
      `startup = ${JSON.stringify(startup)}`,
      `${this.className} - ${this.createStartup.name}`,
    );

    /*  const [startupExists] = await Promise.all([
      this.userRepository.getUserByUid(startup.uuid),
      this.userRepository.getUserByUid(startup.email),
    ]);

    if (startupExists) {
      ErrorUtils.throwSpecificError(400);
    } */

    await this.startupRepository.registerStartup(startup);
  }

  public async getStartupInfos(uuid: string): Promise<Startup> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getStartupInfos.name}`);

    const user = await this.startupRepository.getStartupByUuid(uuid);

    if (!user) {
      ErrorUtils.throwSpecificError(404);
    }

    return user;
  }
}

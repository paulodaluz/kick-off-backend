import { Injectable, Logger } from '@nestjs/common';
import { StartupRepository } from '../repository/startup.repository';
import { Startup } from '../interfaces/startup.interface';
import { ErrorUtils } from '../utils/error.utils';
import { Utils } from 'src/utils/utils.utils';

@Injectable()
export class StartupService {
  private className = 'StartupService';

  constructor(private readonly startupRepository: StartupRepository) {}

  public async registerStartup(startup: Startup): Promise<void> {
    Logger.log(
      `startup = ${JSON.stringify(startup)}`,
      `${this.className} - ${this.registerStartup.name}`,
    );

    const startupExists = await this.startupRepository.getStartupByUuid(startup.uuid);

    if (startupExists && startup.uuid) {
      ErrorUtils.throwSpecificError(400);
    }

    return await this.startupRepository.registerStartup(startup);
  }

  public async getStartupInfos(uuid: string): Promise<Startup> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getStartupInfos.name}`);

    const startup = await this.startupRepository.getStartupByUuid(uuid);

    if (!startup) {
      ErrorUtils.throwSpecificError(404);
    }

    return startup;
  }

  public async updateStartup(uuid: string, startupInfo: Startup): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.updateStartup.name}`);

    const startup = await this.startupRepository.getStartupByUuid(uuid);

    if (!startup) {
      ErrorUtils.throwSpecificError(404);
    }

    Utils.avoidIncorrectUpdate(startupInfo);

    if (!Object.values(startupInfo).length) {
      return;
    }

    await this.startupRepository.updateStartupInfo(uuid, startupInfo);
  }

  public async deleteStartup(uuid: string): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.deleteStartup.name}`);

    return await this.startupRepository.deleteStartupByUuid(uuid);
  }
}

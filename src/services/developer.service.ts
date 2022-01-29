import { Injectable, Logger } from '@nestjs/common';
import { Developer } from 'src/interfaces/dev.interface';
import { DeveloperRepository } from 'src/repository/developer.repository';
import { ErrorUtils } from 'src/utils/error.utils';
import { Utils } from 'src/utils/utils.utils';

@Injectable()
export class DeveloperService {
  private className = 'DeveloperService';

  constructor(private readonly developerRepository: DeveloperRepository) {}

  public async registerDeveloper(developer: Developer): Promise<void> {
    Logger.log(
      `developer = ${JSON.stringify(developer)}`,
      `${this.className} - ${this.registerDeveloper.name}`,
    );

    const developerExists = await this.developerRepository.getDeveloperByUuid(developer.uuid);

    if (developerExists && developerExists.uuid) {
      ErrorUtils.throwSpecificError(400);
    }

    return await this.developerRepository.registerDeveloper(developer);
  }

  public async getDeveloper(uuid: string): Promise<Developer> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getDeveloper.name}`);

    const developer = await this.developerRepository.getDeveloperByUuid(uuid);

    if (!developer) {
      ErrorUtils.throwSpecificError(404);
    }

    return developer;
  }

  public async updateDeveloper(uuid: string, developerInfo: Developer): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.updateDeveloper.name}`);

    const developer = await this.developerRepository.getDeveloperByUuid(uuid);

    if (!developer) {
      ErrorUtils.throwSpecificError(404);
    }

    Utils.avoidIncorrectUpdate(developerInfo);

    if (!Object.values(developerInfo).length) {
      ErrorUtils.throwSpecificError(400);
    }

    await this.developerRepository.updateDeveloperInfo(uuid, developerInfo);
  }

  public async deleteDeveloper(uuid: string): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.deleteDeveloper.name}`);

    return await this.developerRepository.deleteDeveloperByUuid(uuid);
  }
}

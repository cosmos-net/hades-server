import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeormRepository } from '@common/infrastructure/persistence/typeorm/repositories/typeorm-repository';
import { isUUID } from '@helpers/regex/regex-validator-uuid.helper';
import { IProfileRepositoryContract } from '@user/domain/contracts/profile-repository.contract';
import { ProfileModel } from '@user/domain/models/profile/profile.model';
import { ProfileEntity } from '@user/infrastructure/persistence/typeorm/entities/profile.entity';

@Injectable()
export class ProfileTypeormRepository
  extends TypeormRepository<ProfileEntity>
  implements IProfileRepositoryContract
{
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly repository: Repository<ProfileEntity>,
  ) {
    super();
  }

  private async getOneByPhoneNumber(phoneNumber: string): Promise<ProfileEntity | null> {
    const entity = await this.repository.findOne({
      where: { phoneNumber },
    });

    return entity;
  }

  private async getOneByUUID(uuid: string): Promise<ProfileEntity | null> {
    const entity = await this.repository.findOne({
      where: { uuid },
    });

    return entity;
  }

  public async getOneBy(phoneNumberOrUUID: string): Promise<ProfileModel | null> {
    const isUUIDPattern = isUUID(phoneNumberOrUUID);

    const result = isUUIDPattern
      ? await this.getOneByUUID(phoneNumberOrUUID)
      : await this.getOneByPhoneNumber(phoneNumberOrUUID);

    if (!result) {
      return null;
    }

    const profileModel = new ProfileModel(result);

    return profileModel;
  }
}

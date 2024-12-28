import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeormRepository } from '@common/infrastructure/persistence/typeorm/repositories/typeorm-repository';
import { IProfileRepositoryContract } from '@user/domain/contracts/profile-repository.contract';
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

  async isPhoneAvailable(phoneNumber: string): Promise<boolean> {
    const profile = await this.repository.findOneBy({ phoneNumber });
    return !profile;
  }
}

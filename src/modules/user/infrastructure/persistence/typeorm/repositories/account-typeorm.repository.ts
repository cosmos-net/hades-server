import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeormRepository } from '@common/infrastructure/persistence/typeorm/typeorm-repository';
import { IAccountRepositoryContract } from '@user/domain/contracts/account-repository.contract';
import { AccountEntity } from '@user/infrastructure/persistence/typeorm/entities/account.entity';

@Injectable()
export class AccountTypeormRepository
  extends TypeormRepository<AccountEntity>
  implements IAccountRepositoryContract
{
  constructor(
    @InjectRepository(AccountEntity)
    private readonly repository: Repository<AccountEntity>,
  ) {
    super();
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    const account = await this.repository.findOneBy({ username });
    return !account;
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    const account = await this.repository.findOneBy({ email });
    return !account;
  }
}

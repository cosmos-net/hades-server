import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeormRepository } from '@common/infrastructure/persistence/typeorm/repositories/typeorm-repository';
import { isEmail } from '@helpers/regex/regex-validator-email.helper';
import { isUUID } from '@helpers/regex/regex-validator-uuid.helper';
import { IAccountRepositoryContract } from '@user/domain/contracts/account-repository.contract';
import { AccountModel } from '@user/domain/models/account/account.model';
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

  private async getOneByUsername(username: string): Promise<AccountEntity | null> {
    const entity = await this.repository.findOneBy({ username });
    return entity;
  }

  private async getOneByEmail(email: string): Promise<AccountEntity | null> {
    const entity = await this.repository.findOneBy({ email });
    return entity;
  }

  private async getOneByUUID(uuid: string): Promise<AccountEntity | null> {
    const entity = await this.repository.findOneBy({ uuid });
    return entity;
  }

  async getOneBy(UsernameOrEmailOrUUID: string): Promise<AccountModel | null> {
    const isUUIDPattern = isUUID(UsernameOrEmailOrUUID);
    const isEmailPattern = isEmail(UsernameOrEmailOrUUID);

    let entity: AccountEntity | null;

    if (isUUIDPattern) {
      entity = await this.getOneByUUID(UsernameOrEmailOrUUID);
    } else if (isEmailPattern) {
      entity = await this.getOneByEmail(UsernameOrEmailOrUUID);
    } else {
      entity = await this.getOneByUsername(UsernameOrEmailOrUUID);
    }

    if (!entity) {
      return null;
    }

    const accountModel = new AccountModel(entity);

    return accountModel;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IOptions } from '@common/domain/contracts/options.contract';
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

  async create(username: string, email: string, password: string): Promise<AccountModel> {
    const entity = new AccountEntity();
    entity.username = username;
    entity.email = email;
    entity.password = password;

    await this.repository.save(entity);

    const accountModel = new AccountModel(entity);

    return accountModel;
  }

  private async getOneByUsername(
    username: string,
    options?: IOptions,
  ): Promise<AccountEntity | null> {
    const entity = await this.repository.findOne({
      where: { username },
      ...(options?.withArchived && { withDeleted: true }),
      ...(options?.include && { relations: options.include }),
    });
    return entity;
  }

  private async getOneByEmail(email: string, options?: IOptions): Promise<AccountEntity | null> {
    const entity = await this.repository.findOne({
      where: { email },
      ...(options?.withArchived && { withDeleted: true }),
      ...(options?.include && { relations: options.include }),
    });

    return entity;
  }

  private async getOneByUUID(uuid: string, options?: IOptions): Promise<AccountEntity | null> {
    const entity = await this.repository.findOne({
      where: { uuid },
      ...(options?.withArchived && { withDeleted: true }),
      ...(options?.include && { relations: options.include }),
    });

    return entity;
  }

  async getOneBy(UsernameOrEmailOrUUID: string, options?: IOptions): Promise<AccountModel | null> {
    const isUUIDPattern = isUUID(UsernameOrEmailOrUUID);
    const isEmailPattern = isEmail(UsernameOrEmailOrUUID);

    let entity: AccountEntity | null;

    if (isUUIDPattern) {
      entity = await this.getOneByUUID(UsernameOrEmailOrUUID, options);
    } else if (isEmailPattern) {
      entity = await this.getOneByEmail(UsernameOrEmailOrUUID, options);
    } else {
      entity = await this.getOneByUsername(UsernameOrEmailOrUUID, options);
    }

    if (!entity) {
      return null;
    }

    const accountModel = new AccountModel(entity);

    return accountModel;
  }
}

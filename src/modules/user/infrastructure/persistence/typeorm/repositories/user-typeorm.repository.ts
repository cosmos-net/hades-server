import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

import { Criteria } from '@common/domain/criteria/criteria';
import { TypeormRepository } from '@common/infrastructure/persistence/typeorm/typeorm-repository';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { AccountModel } from '@user/domain/models/account/account.model';
import { ProfileModel } from '@user/domain/models/profile/profile.model';
import { ListUserModel } from '@user/domain/models/user/user-list.model';
import { UserModel } from '@user/domain/models/user/user.model';
import { AccountEntity } from '@user/infrastructure/persistence/typeorm/entities/account.entity';
import { ProfileEntity } from '@user/infrastructure/persistence/typeorm/entities/profile.entity';
import { UserEntity } from '@user/infrastructure/persistence/typeorm/entities/user.entity';

@Injectable()
export class UserTypeormRepository
  extends TypeormRepository<UserEntity>
  implements IUserRepositoryContract
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly entityManager: EntityManager,
  ) {
    super();
  }

  async persist(userAggregate: UserAggregate): Promise<UserAggregate> {
    return await this.entityManager.transaction(async (manager: EntityManager) => {
      const savedUser = await manager.save(UserEntity, userAggregate.userModel.toPrimitives());

      const savedProfile = await manager.save(
        ProfileEntity,
        userAggregate.profileModel.toPrimitives(),
      );

      const savedAccounts = await manager.save(
        AccountEntity,
        userAggregate.accountsModel.map((account) => account.toPrimitives()),
      );

      userAggregate.hydrate({
        userModel: new UserModel(savedUser),
        profileModel: new ProfileModel(savedProfile),
        accountsModel: savedAccounts.map((account) => new AccountModel(account)),
      });

      return userAggregate;
    });
  }

  async archive(uuid: string): Promise<boolean> {
    const result = await this.repository.softDelete(uuid);

    return result.affected > 0;
  }

  async destroy(uuid: string): Promise<boolean> {
    const result = await this.repository.delete(uuid);

    return result.affected > 0;
  }

  async getOneBy(uuid: string): Promise<UserAggregate> {
    const entity = await this.repository.findOne({
      where: { uuid },
      relations: {
        accounts: true,
        profile: true,
      },
    });

    const user = new UserModel(entity);
    const profile = new ProfileModel(entity.profile);
    const accounts = entity.accounts.map((account) => new AccountModel(account));

    const userAggregate = new UserAggregate({
      userModel: user,
      profileModel: profile,
      accountsModel: accounts,
    });

    return userAggregate;
  }

  async matching(criteria: Criteria): Promise<ListUserModel> {
    const query = this.getQueryByCriteria(criteria);

    const [items, total] = await this.repository.findAndCount(query);

    const listUserModel = new ListUserModel({
      items,
      total,
    });

    return listUserModel;
  }
}

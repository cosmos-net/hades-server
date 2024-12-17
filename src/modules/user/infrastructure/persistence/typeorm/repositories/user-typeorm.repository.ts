import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

import { Criteria } from '@common/domain/criteria/criteria';
import { TypeormRepository } from '@common/infrastructure/persistence/typeorm/typeorm-repository';
import { ListUserAggregate } from '@user/domain/aggregates/list-user.aggregate';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { AccountModel } from '@user/domain/models/account/account.model';
import { ProfileModel } from '@user/domain/models/profile/profile.model';
import { UserModel } from '@user/domain/models/user/user.model';
import { IAccountSchemaPrimitives } from '@user/domain/schemas/account/account.schema-primitive';
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
    return await this.entityManager.transaction(
      async (manager: EntityManager): Promise<UserAggregate> => {
        const user = userAggregate.userModel.toPrimitives();
        const profile = userAggregate.profileModel.toPrimitives();
        const accounts = userAggregate.accountsModel.map(
          (account): IAccountSchemaPrimitives => account.toPrimitives(),
        );

        // Save or update user entity
        const savedUser = await manager.save(UserEntity, user);

        // Set foreign key for profile entity
        const savedProfile = await manager.save(ProfileEntity, {
          ...profile,
          user: savedUser,
        });

        // Set foreign key for each account entity
        const savedAccounts = [];
        for (const account of accounts) {
          const savedAccount = await manager.save(AccountEntity, {
            ...account,
            user: savedUser,
          });

          savedAccounts.push(savedAccount);
        }

        // Hydrate the aggregate with the saved entities
        userAggregate.hydrate({
          userModel: new UserModel(savedUser),
          profileModel: new ProfileModel(savedProfile),
          accountsModel: savedAccounts.map((account): AccountModel => new AccountModel(account)),
        });

        return userAggregate;
      },
    );
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
    const accounts = entity.accounts.map((account): AccountModel => new AccountModel(account));

    const userAggregate = new UserAggregate({
      userModel: user,
      profileModel: profile,
      accountsModel: accounts,
    });

    return userAggregate;
  }

  async matching(criteria: Criteria): Promise<ListUserAggregate> {
    const query = this.getQueryByCriteria(criteria);

    const [items, total] = await this.repository.findAndCount(query);

    const userAggregate = items.map((item): UserAggregate => {
      const user = new UserModel(item);
      const profile = new ProfileModel(item.profile);
      const accounts = item.accounts.map((account): AccountModel => new AccountModel(account));

      return new UserAggregate({
        userModel: user,
        profileModel: profile,
        accountsModel: accounts,
      });
    });

    return new ListUserAggregate({
      items: userAggregate,
      total,
    });
  }
}

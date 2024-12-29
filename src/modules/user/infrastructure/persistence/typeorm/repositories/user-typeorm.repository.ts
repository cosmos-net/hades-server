import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, DeleteResult } from 'typeorm';

import { IOptions } from '@common/domain/contracts/options.contract';
import { Criteria } from '@common/domain/criteria/criteria';
import { TypeormRepository } from '@common/infrastructure/persistence/typeorm/repositories/typeorm-repository';
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
        const { userModel, profileModel, accountsModel } = userAggregate;

        const partialUser = userModel.toPartialPrimitives();
        const partialProfile = profileModel.toPartialPrimitives();
        const partialAccounts = accountsModel.map(
          (account): Partial<IAccountSchemaPrimitives> => account.toPartialPrimitives(),
        );

        // Save or update user entity
        const savedUser = await manager.save(UserEntity, partialUser);

        userModel.hydrate(savedUser);

        // Set foreign key for profile entity
        const savedProfile = await manager.save(ProfileEntity, {
          ...partialProfile,
          user: savedUser,
        });

        profileModel.hydrate(savedProfile);

        for (const partialAccount of partialAccounts) {
          const savedAccount = await manager.save(AccountEntity, {
            ...partialAccount,
            user: savedUser,
          });

          const accountMatch = accountsModel.find(
            (account): boolean => account.uuid === savedAccount.uuid,
          );

          accountMatch.hydrate(savedAccount);
        }

        // Hydrate the aggregate with the saved entities
        userAggregate.hydrate({
          userModel,
          profileModel,
          accountsModel,
        });

        return userAggregate;
      },
    );
  }

  async archive(uuid: string): Promise<boolean> {
    const result = await this.repository.softDelete({ uuid });

    return result.affected > 0;
  }

  async destroy(userAggregate: UserAggregate): Promise<boolean> {
    return await this.entityManager.transaction(
      async (manager: EntityManager): Promise<boolean> => {
        const { userModel, accountsModel, profileModel } = userAggregate;
        const promises: Promise<DeleteResult>[] = [];

        // Delete accounts
        for (const account of accountsModel) {
          promises.push(manager.delete(AccountEntity, { uuid: account.uuid }));
        }

        // Delete profile
        promises.push(manager.delete(ProfileEntity, { uuid: profileModel.uuid }));

        // Delete user
        promises.push(manager.delete(UserEntity, { uuid: userModel.uuid }));

        await Promise.all(promises);

        return true;
      },
    );
  }

  async getOneBy(uuid: string, options?: IOptions): Promise<UserAggregate | null> {
    const entity = await this.repository.findOne({
      where: { uuid },
      relations: {
        accounts: true,
        profile: true,
      },
      ...(options?.withArchived && { withDeleted: true }),
    });

    if (!entity) {
      return null;
    }

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

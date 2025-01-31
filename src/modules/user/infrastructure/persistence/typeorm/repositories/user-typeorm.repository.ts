import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, DeleteResult, SelectQueryBuilder } from 'typeorm';

import { IOptions } from '@common/domain/contracts/options.contract';
import { Criteria } from '@common/domain/criteria/criteria';
import { TypeormRepository } from '@common/infrastructure/persistence/typeorm/repositories/typeorm-repository';
import { SessionEntity } from '@session/infrastructure/persistence/typeorm/entities/session.entity';
import { ListUserAggregate } from '@user/domain/aggregates/list-user.aggregate';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { AccountModel } from '@user/domain/models/account/account.model';
import { ProfileModel } from '@user/domain/models/profile/profile.model';
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

  createSelectQueryBuilder(): SelectQueryBuilder<UserEntity> {
    const selectQueryBuilder = this.repository.createQueryBuilder('user');

    selectQueryBuilder.leftJoinAndSelect('user.profile', 'profile');
    selectQueryBuilder.leftJoinAndSelect('user.accounts', 'accounts');

    return selectQueryBuilder;
  }

  async persist(userAggregate: UserAggregate): Promise<UserAggregate> {
    return await this.entityManager.transaction(
      async (manager: EntityManager): Promise<UserAggregate> => {
        const { userModel, profileModel, accountsModel } = userAggregate;

        const partialUser = userModel.toPartialPrimitives();
        const partialProfile = profileModel.toPartialPrimitives();

        const savedUser = await manager.save(UserEntity, partialUser);

        userModel.hydrate(savedUser);

        const savedProfile = await manager.save(ProfileEntity, {
          ...partialProfile,
          user: savedUser,
        });

        profileModel.hydrate(savedProfile);

        for await (const accountModel of accountsModel) {
          const partialPrimitivesAccount = accountModel.toPartialPrimitives();

          const savedAccount = await manager.save(AccountEntity, {
            ...partialPrimitivesAccount,
            user: savedUser,
          });

          accountModel.hydrate(savedAccount);

          const listSessionModel = accountModel.sessions;
          if (listSessionModel?.getTotal > 0) {
            const sessionModels = listSessionModel.getItemModels;

            for await (const sessionModel of sessionModels) {
              const partialPrimitivesSession = sessionModel.toPartialPrimitives();

              const savedSession = await manager.save(SessionEntity, {
                ...partialPrimitivesSession,
                account: savedAccount,
              });

              sessionModel.hydrate(savedSession);
            }
          }
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

        for (const account of accountsModel) {
          promises.push(manager.delete(AccountEntity, { uuid: account.uuid }));
        }

        promises.push(manager.delete(ProfileEntity, { uuid: profileModel.uuid }));
        promises.push(manager.delete(UserEntity, { uuid: userModel.uuid }));

        await Promise.all(promises);

        return true;
      },
    );
  }

  async getOneBy(uuid: string, options?: IOptions): Promise<UserAggregate | null> {
    const entity = await this.repository.findOne({
      where: { uuid },
      ...(options?.relations && { relations: options.relations }),
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

  async getUserByUUID(uuid: string, options?: IOptions): Promise<UserModel | null> {
    const user = await this.repository.findOne({
      where: { uuid },
      ...(options?.withArchived && { withDeleted: true }),
    });

    if (!user) {
      return null;
    }

    return new UserModel(user);
  }

  async matching(criteria: Criteria): Promise<ListUserAggregate> {
    const selectQueryBuilder = this.createSelectQueryBuilder();
    const query = this.getQueryBuilderByCriteria(criteria, selectQueryBuilder);

    const [items, total] = await query.getManyAndCount();

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

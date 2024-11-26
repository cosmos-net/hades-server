import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUserModel } from '@user/domain/models/list-user.model';
import { UserModel } from '@user/domain/models/user.model';
import { Repository } from 'typeorm';

import { Criteria } from '@common/domain/criteria/criteria';
import { TypeormRepository } from '@common/infrastructure/persistence/typeorm/typeorm-repository';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { UserEntity } from '@user/infrastructure/persistence/entities/user.entity';

@Injectable()
export class UserTypeormRepository
  extends TypeormRepository<UserEntity>
  implements IUserRepositoryContract
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {
    super();
  }

  persist<UserModel>(model: UserModel): Promise<UserModel> {
    return this.repository.save(model);
  }

  async archive(uuid: string): Promise<boolean> {
    const result = await this.repository.softDelete(uuid);

    return result.affected > 0;
  }

  async destroy(uuid: string): Promise<boolean> {
    const result = await this.repository.delete(uuid);

    return result.affected > 0;
  }

  async getOneBy(uuid: string): Promise<UserModel> {
    const entity = await this.repository.findOneBy({ uuid });

    const model = new UserModel(entity);

    return model;
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

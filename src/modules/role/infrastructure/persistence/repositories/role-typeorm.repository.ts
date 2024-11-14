import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Criteria } from '@common/domain/criteria/criteria';
import { TypeormRepository } from '@common/infrastructure/persistence/typeorm/typeorm-repository';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { ListRoleModel } from '@role/domain/models/role-list.model';
import { RoleModel } from '@role/domain/models/role.model';
import { RoleEntity } from '@role/infrastructure/persistence/entities/role.entity';

@Injectable()
export class RoleTypeormRepository
  extends TypeormRepository<RoleEntity>
  implements IRoleRepositoryContract
{
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
  ) {
    super();
  }

  async isNameAvailable(name: string): Promise<boolean> {
    const role = await this.repository.findOneBy({ name });
    return !role;
  }

  persist<RoleModel>(model: RoleModel): Promise<RoleModel> {
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

  async getOneBy(uuid: string): Promise<RoleModel> {
    const entity = await this.repository.findOneBy({ uuid });

    const model = new RoleModel(entity);

    return model;
  }

  async matching(criteria: Criteria): Promise<ListRoleModel> {
    const query = this.getQueryByCriteria(criteria);

    const [items, total] = await this.repository.findAndCount(query);

    const listRoleModel = new ListRoleModel({
      items,
      total,
    });

    return listRoleModel;
  }
}

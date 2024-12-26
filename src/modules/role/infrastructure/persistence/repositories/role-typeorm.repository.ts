import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Criteria } from '@common/domain/criteria/criteria';
import { TypeormRepository } from '@common/infrastructure/persistence/typeorm/typeorm-repository';
import { IOptions, IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { ListRoleModel } from '@role/domain/models/role-list.model';
import { RoleEntity } from '@role/infrastructure/persistence/entities/role.entity';
import { RoleModel } from '@role/domain/models/role.model';
import { isUUID } from '@helpers/regex/regex-validator-uuid.helper';

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

  private async getOneByName(name: string, options?: IOptions): Promise<RoleEntity | null> {
    const entity = await this.repository.findOne({
      where: { name },
      ...(options?.withArchived ? { withDeleted: true } : {}),
    });

    return entity;
  }

  private async getOneByUUID(uuid: string, options?: IOptions): Promise<RoleEntity | null> {
    const entity = await this.repository.findOne({
      where: { uuid },
      ...(options?.withArchived ? { withDeleted: true } : {}),
    });

    return entity;
  }

  public async getOneBy(nameOrUUID: string, options?: IOptions): Promise<RoleModel> {
    const isUUIDPattern = isUUID(nameOrUUID);

    const result = isUUIDPattern ? await this.getOneByUUID(nameOrUUID, options) : await this.getOneByName(nameOrUUID, options);

    if (!result) {
      return null;
    }

    const roleModel = new RoleModel(result);

    return roleModel;
  }



  public async persist(model: RoleModel): Promise<RoleModel> {
    const primitives = model.toPartialPrimitives();
    const entity = await this.repository.save(primitives);
    const roleModel = new RoleModel(entity);

    return roleModel;
  }

  public async archive(uuid: string): Promise<boolean> {
    const result = await this.repository.softDelete({
      uuid,
    });

    return result.affected > 0;
  }

  public async destroy(uuid: string): Promise<boolean> {
    const result = await this.repository.delete({uuid});

    return result.affected > 0;
  }

  public async matching(criteria: Criteria): Promise<ListRoleModel> {
    const query = this.getQueryByCriteria(criteria);

    const [items, total] = await this.repository.findAndCount(query);

    const listRoleModel = new ListRoleModel({
      items,
      total,
    });

    return listRoleModel;
  }
}

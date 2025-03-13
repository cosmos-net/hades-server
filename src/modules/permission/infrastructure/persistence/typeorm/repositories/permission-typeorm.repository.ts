import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IOptions } from '@common/domain/contracts/options.contract';
import { Criteria } from '@common/domain/criteria/criteria';
import { TypeormRepository } from '@common/infrastructure/persistence/typeorm/repositories/typeorm-repository';
import { IPermissionRepositoryContract } from '@permission/domain/contracts/permission-repository.contract';
import { ListPermissionModel } from '@permission/domain/models/permission-list.model';
import { PermissionModel } from '@permission/domain/models/permission.model';
import { PermissionEntity } from '@permission/infrastructure/persistence/typeorm/entities/permission.entity';

@Injectable()
export class PermissionTypeormRepository
  extends TypeormRepository<PermissionEntity>
  implements IPermissionRepositoryContract
{
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly repository: Repository<PermissionEntity>,
  ) {
    super();
  }

  public async getOneBy(uuid: string, options?: IOptions): Promise<PermissionModel | null> {
    const entity = await this.repository.findOne({
      where: { uuid },
      withDeleted: options?.withArchived ?? false,
      relations: options?.relations,
    });

    if (!entity) {
      return null;
    }

    return PermissionModel.fromPrimitives(entity);
  }

  public async getOneByCombination(
    actionId: string,
    moduleId?: string,
    submoduleId?: string,
    options?: IOptions,
  ): Promise<PermissionModel> {
    const entity = await this.repository.findOne({
      where: {
        action: {
          id: actionId,
        },
        ...(moduleId && {
          module: {
            id: moduleId,
          },
        }),
        ...(submoduleId && {
          submodule: {
            id: submoduleId,
          },
        }),
      },
      withDeleted: options?.withArchived ?? false,
      relations: options?.relations,
    });

    return PermissionModel.fromPrimitives(entity);
  }

  public async persist(model: PermissionModel): Promise<void> {
    const primitives = model.toPartialPrimitives();

    const entity = await this.repository.save(primitives);

    model.hydrateFromPrimitives(entity);
  }

  public async matching(criteria: Criteria): Promise<ListPermissionModel> {
    const query = this.getQueryByCriteria(criteria);

    const [items, total] = await this.repository.findAndCount(query);

    return new ListPermissionModel({
      total,
      items,
    });
  }

  public async destroy(uuid: string): Promise<boolean> {
    const result = await this.repository.delete({ uuid });

    return result.affected === 1;
  }
}

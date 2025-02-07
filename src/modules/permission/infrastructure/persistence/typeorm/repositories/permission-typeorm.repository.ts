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

    const { title, actionId, moduleId, submoduleId } = entity;
    const [actionName, moduleName, submoduleName] = title.split('-');

    const action = { id: actionId, name: actionName };
    const module = { id: moduleId, name: moduleName };
    const submodule = { id: submoduleId, name: submoduleName };

    const model = new PermissionModel({
      ...entity,
      action,
      module,
      ...(submodule.id ? { submodule } : {}),
    });

    return model;
  }

  public async getOneByCombination(
    actionId: string,
    moduleId?: string,
    submoduleId?: string,
    options?: IOptions,
  ): Promise<PermissionModel> {
    const entity = await this.repository.findOne({
      where: {
        actionId: actionId,
        ...(moduleId && { moduleId }),
        ...(submoduleId && { submoduleId }),
      },
      withDeleted: options?.withArchived ?? false,
      relations: options?.relations,
    });

    if (!entity) {
      return null;
    }

    const {
      title,
      actionId: actionIdEntity,
      moduleId: modelIdEntity,
      submoduleId: subModelIdEntity,
    } = entity;

    const [actionName, moduleName, submoduleName] = title.split('-');

    const action = { id: actionIdEntity, name: actionName };
    const module = { id: modelIdEntity, name: moduleName };
    const submodule = { id: subModelIdEntity, name: submoduleName };

    const model = new PermissionModel({
      ...entity,
      action,
      module,
      ...(submodule.id ? { submodule } : {}),
    });

    return model;
  }

  public async persist(model: PermissionModel): Promise<PermissionModel> {
    const partialPrimitives = model.toPartialPrimitives();

    const entity = await this.repository.save({
      ...partialPrimitives,
      ...{
        actionId: model.action.id,
        moduleId: model.module.id,
        submoduleId: model.submodule.id,
      },
    });

    const { title, actionId, moduleId, submoduleId } = entity;
    const [actionName, moduleName, submoduleName] = title.split('-');

    const action = { id: actionId, name: actionName };
    const module = { id: moduleId, name: moduleName };
    const submodule = { id: submoduleId, name: submoduleName };

    model.hydrate({
      ...entity,
      action,
      module,
      ...(submodule.id ? { submodule } : {}),
    });

    return model;
  }

  public async matching(criteria: Criteria): Promise<ListPermissionModel> {
    const query = this.getQueryByCriteria(criteria);

    const [items, total] = await this.repository.findAndCount(query);

    const models = items.map((entity): PermissionModel => {
      const { title, actionId, moduleId, submoduleId } = entity;
      const [actionName, moduleName, submoduleName] = title.split('-');

      const action = { id: actionId, name: actionName };
      const module = { id: moduleId, name: moduleName };
      const submodule = { id: submoduleId, name: submoduleName };

      return new PermissionModel({
        ...entity,
        action,
        module,
        submodule,
      });
    });

    return new ListPermissionModel({
      items: models,
      total,
    });
  }

  public async destroy(uuid: string): Promise<boolean> {
    const result = await this.repository.delete({ uuid });

    return result.affected === 1;
  }
}

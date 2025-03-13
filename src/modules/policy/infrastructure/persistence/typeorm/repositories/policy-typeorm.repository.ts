import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';

import { IOptions } from '@common/domain/contracts/options.contract';
import { Criteria } from '@common/domain/criteria/criteria';
import { TypeormRepository } from '@common/infrastructure/persistence/typeorm/repositories/typeorm-repository';
import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { ListPolicyModel } from '@policy/domain/models/list-policy.model';
import { PolicyModel } from '@policy/domain/models/policy.model';
import { PolicyEntity } from '@policy/infrastructure/persistence/typeorm/entities/policy.entity';

@Injectable()
export class PolicyTypeormRepository
  extends TypeormRepository<PolicyEntity>
  implements IPolicyRepositoryContract
{
  constructor(
    @InjectRepository(PolicyEntity)
    private readonly repository: Repository<PolicyEntity>,
  ) {
    super();
  }

  public async getOneByUUID(uuid: string, options?: IOptions): Promise<PolicyModel | null> {
    const entity = await this.repository.findOne({
      where: { uuid },
      withDeleted: options?.withArchived ?? false,
      relations: options?.relations,
    });

    if (!entity) {
      return null;
    }

    const model = PolicyModel.fromPrimitives(entity);

    return model;
  }

  public async getOneByRoleUUID(roleUUID: string, options?: IOptions): Promise<PolicyModel | null> {
    const entity = await this.repository.findOne({
      where: { role: { uuid: roleUUID } },
      withDeleted: options?.withArchived ?? false,
      relations: options?.relations,
    });

    if (!entity) {
      return null;
    }

    const model = PolicyModel.fromPrimitives(entity);

    return model;
  }

  public async getOneByPermissionUUID(
    permissionUUID: string,
    options?: IOptions,
  ): Promise<PolicyModel | null> {
    const entity = await this.repository.findOne({
      where: {
        permission: {
          uuid: permissionUUID,
        },
      },
      withDeleted: options?.withArchived ?? false,
      relations: options?.relations,
    });

    if (!entity) {
      return null;
    }

    const model = PolicyModel.fromPrimitives(entity);

    return model;
  }

  public async getOneByCombination({
    uuid,
    roleUUID,
    permissionUUID,
  }: {
    uuid?: string;
    roleUUID?: string;
    permissionUUID?: string;
  }): Promise<PolicyModel | null> {
    if (!uuid && !roleUUID && !permissionUUID) {
      return null;
    }

    const entity = await this.repository.findOne({
      where: {
        ...(uuid && { uuid }),
        ...(roleUUID && { role: { uuid: roleUUID } }),
        ...(permissionUUID && { permission: { uuid: permissionUUID } }),
      },
    });

    if (!entity) {
      return null;
    }

    const model = PolicyModel.fromPrimitives(entity);

    return model;
  }

  public async getByPermissionUUIDs(
    permissionUUIDs: string[],
    options?: IOptions,
  ): Promise<ListPolicyModel> {
    const entities = await this.repository.find({
      where: { permission: In(permissionUUIDs) },
      withDeleted: options?.withArchived ?? false,
      relations: options?.relations,
    });

    const listModel = new ListPolicyModel({
      items: entities,
      total: entities.length,
    });

    return listModel;
  }

  public async getOneByTitle(title: string, options?: IOptions): Promise<PolicyModel | null> {
    const entity = await this.repository.findOne({
      where: { title },
      withDeleted: options?.withArchived ?? false,
      relations: options?.relations,
    });

    const model = PolicyModel.fromPrimitives(entity);

    return model;
  }

  public async getOneByDescription(
    description: string,
    options?: IOptions,
  ): Promise<PolicyModel | null> {
    const entity = await this.repository.findOne({
      where: {
        description: ILike(`%${description}%`),
      },
      withDeleted: options?.withArchived ?? false,
      relations: options?.relations,
    });

    const model = PolicyModel.fromPrimitives(entity);

    return model;
  }

  public async listByRoleUUID(roleUUID: string, options?: IOptions): Promise<ListPolicyModel> {
    const [items, total] = await this.repository.findAndCount({
      where: { role: { uuid: roleUUID } },
      withDeleted: options?.withArchived ?? false,
      relations: options?.relations,
    });

    const listModel = new ListPolicyModel({
      items,
      total,
    });

    return listModel;
  }

  public async persist(model: PolicyModel): Promise<PolicyModel> {
    const partialPrimitives = model.toPartialPrimitives();
    const { permission, role } = model;

    const entity = await this.repository.save({
      ...partialPrimitives,
      permission,
      role,
    });

    model.hydrateFromPrimitive(entity);

    return model;
  }

  public async matching(criteria: Criteria): Promise<ListPolicyModel> {
    const query = this.getQueryByCriteria(criteria);

    const [items, total] = await this.repository.findAndCount(query);

    const listModel = new ListPolicyModel({
      items,
      total,
    });

    return listModel;
  }

  public async destroy(uuid: string): Promise<boolean> {
    const result = await this.repository.delete({ uuid });

    return result.affected === 1;
  }
}

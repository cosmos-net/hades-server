import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

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

    const model = new PolicyModel(entity);

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

    const model = new PolicyModel(entity);

    return model;
  }

  public async getOneByTitle(title: string, options?: IOptions): Promise<PolicyModel | null> {
    const entity = await this.repository.findOne({
      where: { title },
      withDeleted: options?.withArchived ?? false,
      relations: options?.relations,
    });

    const model = new PolicyModel(entity);

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

    const model = new PolicyModel(entity);

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
    const { permissionList, role } = model;

    const permissions = permissionList.getItemsModel;

    const entity = await this.repository.save({
      ...partialPrimitives,
      permissions,
      role,
    });

    model.hydrate(entity);

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

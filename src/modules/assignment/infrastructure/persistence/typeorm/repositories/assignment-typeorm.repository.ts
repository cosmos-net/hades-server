import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { ListAssignmentModel } from '@assignment/domain/models/assignment-list.model';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';
import { AssignmentEntity } from '@assignment/infrastructure/persistence/typeorm/entities/assignment.entity';
import { IOptions } from '@common/domain/contracts/options.contract';
import { Criteria } from '@common/domain/criteria/criteria';
import { TypeormRepository } from '@common/infrastructure/persistence/typeorm/repositories/typeorm-repository';

@Injectable()
export class AssignmentTypeormRepository
  extends TypeormRepository<AssignmentEntity>
  implements IAssignmentRepositoryContract
{
  constructor(
    @InjectRepository(AssignmentEntity)
    private readonly repository: Repository<AssignmentEntity>,
  ) {
    super();
  }

  public async getOneByUUID(uuid: string, options?: IOptions): Promise<AssignmentModel | null> {
    const entity = await this.repository.findOne({
      where: { uuid },
      withDeleted: options?.withArchived ?? false,
    });

    const model = new AssignmentModel(entity);

    return model;
  }

  public async getOneByUserUUID(
    userUUID: string,
    options?: IOptions,
  ): Promise<AssignmentModel | null> {
    const entity = await this.repository.findOne({
      where: { user: { uuid: userUUID } },
      withDeleted: options?.withArchived ?? false,
    });

    const model = new AssignmentModel(entity);

    return model;
  }

  public async getOneByRoleUUID(
    roleUUID: string,
    options?: IOptions,
  ): Promise<AssignmentModel | null> {
    const entity = await this.repository.findOne({
      where: { role: { uuid: roleUUID } },
      withDeleted: options?.withArchived ?? false,
    });

    const model = new AssignmentModel(entity);

    return model;
  }

  public async getOneByTitle(title: string, options?: IOptions): Promise<AssignmentModel | null> {
    const entity = await this.repository.findOne({
      where: { title },
      withDeleted: options?.withArchived ?? false,
    });

    const model = new AssignmentModel(entity);

    return model;
  }

  public async getOneByDescription(
    description: string,
    options?: IOptions,
  ): Promise<AssignmentModel | null> {
    const entity = await this.repository.findOne({
      where: {
        description: ILike(`%${description}%`),
      },
      withDeleted: options?.withArchived ?? false,
    });

    const model = new AssignmentModel(entity);

    return model;
  }

  public async persist(model: AssignmentModel): Promise<AssignmentModel> {
    const partialPrimitives = model.toPartialPrimitives();
    const entity = await this.repository.save(partialPrimitives);
    model.hydrate(entity);

    return model;
  }

  public async matching(criteria: Criteria): Promise<ListAssignmentModel> {
    const query = this.getQueryByCriteria(criteria);

    const [items, total] = await this.repository.findAndCount(query);

    const listModel = new ListAssignmentModel({
      items,
      total,
    });

    return listModel;
  }

  public async destroy(UUID: string): Promise<boolean> {
    const result = await this.repository.delete({ uuid: UUID });

    return result.affected === 1;
  }
}

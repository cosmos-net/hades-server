import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IOptions } from '@common/domain/contracts/options.contract';
import { Criteria } from '@common/domain/criteria/criteria';
import { TypeormRepository } from '@common/infrastructure/persistence/typeorm/repositories/typeorm-repository';
import { isUUID } from '@helpers/regex/regex-validator-uuid.helper';
import { ISessionRepositoryContract } from '@session/domain/contracts/session-repository.contract';
import { ListSessionModel } from '@session/domain/models/session-list.model';
import { SessionModel } from '@session/domain/models/session.model';
import { SessionEntity } from '@session/infrastructure/persistence/typeorm/entities/session.entity';

@Injectable()
export class SessionTypeormRepository
  extends TypeormRepository<SessionEntity>
  implements ISessionRepositoryContract
{
  constructor(
    @InjectRepository(SessionEntity)
    private readonly repository: Repository<SessionEntity>,
  ) {
    super();
  }

  private async getOneByUUID(uuid: string, options?: IOptions): Promise<SessionEntity | null> {
    const entity = await this.repository.findOne({
      where: { uuid },
      ...(options?.withArchived ? { withDeleted: true } : {}),
      ...(options?.include ? { relations: options.include } : {}),
    });

    return entity;
  }

  public async getOneBy(nameOrUUID: string, options?: IOptions): Promise<SessionModel> {
    const isUUIDPattern = isUUID(nameOrUUID);

    const result = isUUIDPattern ? await this.getOneByUUID(nameOrUUID, options) : null;

    if (!result) {
      return null;
    }

    const sessionModel = new SessionModel(result);

    return sessionModel;
  }

  public async persist(model: SessionModel): Promise<SessionModel> {
    const primitives = model.toPartialPrimitives();
    const entity = await this.repository.save(primitives);
    const roleModel = new SessionModel(entity);

    return roleModel;
  }

  public async destroy(uuid: string): Promise<boolean> {
    const result = await this.repository.delete({ uuid });

    return result.affected > 0;
  }

  public async matching(criteria: Criteria): Promise<ListSessionModel> {
    const query = this.getQueryByCriteria(criteria);

    const [items, total] = await this.repository.findAndCount(query);

    const listRoleModel = new ListSessionModel({
      items,
      total,
    });

    return listRoleModel;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleModel } from '@role/domain/models/role.model';
import { RoleEntity } from '@role/infrastructure/persistence/entities/role.entity';

@Injectable()
export class RoleTypeormRepository implements IRoleRepositoryContract {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
  ) {}

  async isNameAvailable(name: string): Promise<boolean> {
    const role = await this.repository.findOneBy({ name });
    return !role;
  }

  persist(role: RoleModel): Promise<RoleModel> {
    return this.repository.save(role);
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
}

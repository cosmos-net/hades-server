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
}

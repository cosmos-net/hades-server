import { Injectable } from '@nestjs/common';

import { CreateRoleCommand } from '@role/application/commands/use-cases/create-rol/create-rol.command';
import { RoleModel } from '@role/domain/models/role.model';
import { RoleDomainService } from '@role/domain/services/role.domain-service';

@Injectable()
export class CreateRolUseCase {
  constructor(private readonly roleDomainService: RoleDomainService) {}

  async execute(command: CreateRoleCommand): Promise<RoleModel> {
    const { uuid, name, description } = command;

    const role = new RoleModel(uuid, name, description);

    await this.roleDomainService.createRole(role);

    return role;
  }
}

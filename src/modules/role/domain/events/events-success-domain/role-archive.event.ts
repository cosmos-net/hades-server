import { RoleModel } from '@role/domain/models/role.model';

export class RoleArchivedEvent {
  constructor(public readonly roleModel: RoleModel) {}
}

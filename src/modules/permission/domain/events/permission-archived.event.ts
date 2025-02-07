import { PermissionModel } from '@permission/domain/models/permission.model';

export class PermissionArchivedEvent {
  constructor(public readonly permission: PermissionModel) {}
}

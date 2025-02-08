import { PermissionModel } from '@permission/domain/models/permission.model';

export class PermissionUnarchivedEvent {
  constructor(public readonly permission: PermissionModel) {}
}

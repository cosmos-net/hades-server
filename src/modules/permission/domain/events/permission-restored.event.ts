import { PermissionModel } from '@permission/domain/models/permission.model';

export class PermissionRestoredEvent {
  constructor(public readonly permission: PermissionModel) {}
}

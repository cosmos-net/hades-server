import { PermissionModel } from '@permission/domain/models/permission.model';

export class PermissionDestroyedEvent {
  constructor(public readonly permission: PermissionModel) {}
}

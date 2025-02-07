import { PermissionModel } from '@permission/domain/models/permission.model';

export class PermissionCreatedEvent {
  constructor(public readonly permission: PermissionModel) {}
}

import { PermissionModel } from '@permission/domain/models/permission.model';

export class PermissionDescriptionRedescribedEvent {
  constructor(public readonly permission: PermissionModel) {}
}

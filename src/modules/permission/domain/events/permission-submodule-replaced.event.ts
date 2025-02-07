import { PermissionModel } from '@permission/domain/models/permission.model';

export class PermissionSubmoduleReplacedEvent {
  constructor(public readonly permission: PermissionModel) {}
}

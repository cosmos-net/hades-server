import { PermissionModel } from '@permission/domain/models/permission.model';

export class PermissionModuleReplacedEvent {
  constructor(public readonly permission: PermissionModel) {}
}

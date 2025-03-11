import { PolicyModel } from '@policy/domain/models/policy.model';

export class ArchivePolicyOutputDto {
  public readonly uuid: string;
  public readonly archivedAt: Date;

  constructor(root: PolicyModel) {
    this.uuid = root.uuid;
    this.archivedAt = root.archivedAt;
  }
}

import { PolicyModel } from '@policy/domain/models/policy.model';

export class PolicyArchivedEvent {
  constructor(public readonly policyModel: PolicyModel) {}
}

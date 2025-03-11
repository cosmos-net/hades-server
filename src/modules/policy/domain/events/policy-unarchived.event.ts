import { PolicyModel } from '@policy/domain/models/policy.model';

export class PolicyUnarchivedEvent {
  constructor(public readonly policyModel: PolicyModel) {}
}

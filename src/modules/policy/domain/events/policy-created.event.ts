import { PolicyModel } from '@policy/domain/models/policy.model';

export class PolicyCreatedEvent {
  constructor(public readonly policyModel: PolicyModel) {}
}

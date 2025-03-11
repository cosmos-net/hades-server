import { PolicyModel } from '@policy/domain/models/policy.model';

export class PolicyRedescribedEvent {
  constructor(public readonly policyModel: PolicyModel) {}
}

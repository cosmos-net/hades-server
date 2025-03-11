import { PolicyModel } from '@policy/domain/models/policy.model';

export class PolicyDestroyedEvent {
  constructor(public readonly policyModel: PolicyModel) {}
}

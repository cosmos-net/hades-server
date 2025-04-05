import { ListPolicyModel } from '@policy/domain/models/list-policy.model';
import { IPolicySchemaPrimitives } from '@policy/domain/schemas/policy.schema-primitives';

export class ListPoliciesByAccountOutputDto {
  public readonly total: number;
  public readonly items: IPolicySchemaPrimitives[];

  constructor(root: ListPolicyModel) {
    this.total = root.getTotal;
    this.items = root.getItemsPrimitives;
  }
}
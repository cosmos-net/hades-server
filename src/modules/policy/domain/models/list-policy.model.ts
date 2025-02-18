import { PolicyModel } from '@policy/domain/models/policy.model';
import {
  IPolicySchemaPrimitives,
  IListPolicySchemaPrimitives,
} from '@policy/domain/schemas/policy.schema-primitives';

export class ListPolicyModel {
  private readonly items: PolicyModel[];
  private total: number;

  constructor(listPolicy: IListPolicySchemaPrimitives) {
    this.items = listPolicy.items.map((policy): PolicyModel => new PolicyModel(policy));
    this.total = listPolicy.total;
  }

  public get getItems(): IPolicySchemaPrimitives[] {
    return this.items.map((policy): IPolicySchemaPrimitives => policy.toPrimitives());
  }

  public get getItemsModel(): PolicyModel[] {
    return this.items;
  }

  public get getTotal(): number {
    return this.total;
  }

  public hydrate(policies: IPolicySchemaPrimitives[]): void {
    this.setItems(policies);
  }

  private setTotal(total: number): void {
    this.total = total;
  }

  private setItems(items: IPolicySchemaPrimitives[]): void {
    items.forEach((item): void => this.addItems(item));
    this.setTotal(items.length);
  }

  private addItems(item: IPolicySchemaPrimitives): void {
    this.items.push(new PolicyModel(item));
  }
}

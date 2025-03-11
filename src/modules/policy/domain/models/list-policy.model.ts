import { PolicyModel } from '@policy/domain/models/policy.model';
import {
  IPolicySchemaPrimitives,
  IListPolicySchemaPrimitives,
} from '@policy/domain/schemas/policy.schema-primitives';

export class ListPolicyModel {
  private readonly items: PolicyModel[];
  private total: number;

  constructor(listPolicy?: IListPolicySchemaPrimitives) {
    this.items = [];
    this.total = 0;

    if (!listPolicy) {
      return;
    }

    this.hydrate(listPolicy.items);
  }

  private hydrate(policies: IPolicySchemaPrimitives[]): void {
    this.setItems(policies);
  }

  private setItems(policies: IPolicySchemaPrimitives[]): void {
    policies.forEach((policy): void => {
      this.addItemFromPrimitives(policy);
    });
  }
  private addItemFromPrimitives(item: IPolicySchemaPrimitives): void {
    this.items.push(PolicyModel.fromPrimitives(item));
    this.incrementTotal();
  }

  public add(policy: PolicyModel): void {
    this.addItemFromModel(policy);
  }

  public remove(policy: PolicyModel): boolean {
    let isPolicyRemoved = false;

    const index = this.items.findIndex((item): boolean => item.uuid === policy.uuid);
    if (index === -1) {
      return isPolicyRemoved;
    }

    isPolicyRemoved = true;
    this.removeItem(index);

    return isPolicyRemoved;
  }

  private removeItem(index: number): void {
    this.items.splice(index, 1);
    this.decrementTotal();
  }

  private addItemFromModel(item: PolicyModel): void {
    this.items.push(item);
    this.incrementTotal();
  }

  private incrementTotal(): void {
    this.total += 1;
  }

  private decrementTotal(): void {
    this.total -= 1;
  }

  public get getItemsPrimitives(): IPolicySchemaPrimitives[] {
    return this.items.map((policy): IPolicySchemaPrimitives => policy.toPrimitives());
  }

  public get getItemsModel(): PolicyModel[] {
    return this.items;
  }

  public get getTotal(): number {
    return this.total;
  }

  public get toPrimitives(): IListPolicySchemaPrimitives {
    return {
      items: this.getItemsPrimitives,
      total: this.total,
    };
  }

  public static fromPrimitives(listPolicy: IListPolicySchemaPrimitives): ListPolicyModel {
    return new ListPolicyModel(listPolicy);
  }
}

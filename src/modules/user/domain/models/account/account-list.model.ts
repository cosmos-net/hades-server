import { AccountModel } from '@user/domain/models/account/account.model';
import {
  IAccountSchemaPrimitives,
  IListAccountSchemaPrimitive,
} from '@user/domain/schemas/account/account.schema-primitive';

export class ListAccountModel {
  private readonly items: AccountModel[];
  private total: number;

  constructor(listAccount: IListAccountSchemaPrimitive) {
    this.items = listAccount.items.map((account) => new AccountModel(account));
    this.total = listAccount.total;
  }

  public get getItems(): IAccountSchemaPrimitives[] {
    return this.items.map((account) => account.toPrimitives());
  }

  public get getTotal(): number {
    return this.total;
  }

  public hydrate(accounts: IAccountSchemaPrimitives[]) {
    this.setItems(accounts);
  }

  private setTotal(total: number) {
    this.total = total;
  }

  private setItems(items: IAccountSchemaPrimitives[]) {
    items.forEach((item) => this.addItems(item));
    this.setTotal(items.length);
  }

  private addItems(item: IAccountSchemaPrimitives) {
    this.items.push(new AccountModel(item));
  }
}

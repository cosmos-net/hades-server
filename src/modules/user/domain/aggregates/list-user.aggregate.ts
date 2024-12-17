import {
  IUserSchemaPrimitivesAggregate,
  UserAggregate,
} from '@user/domain/aggregates/user.aggregate';

export interface IListUserAggregate {
  total: number;
  items: UserAggregate[];
}

export class ListUserAggregate {
  constructor(listUser: IListUserAggregate) {
    this.items = listUser.items;
    this.total = listUser.total;
  }

  private readonly items: UserAggregate[];
  private total: number;

  private setTotal(total: number): void {
    this.total = total;
  }

  private addItems(item: UserAggregate): void {
    this.items.push(item);
  }

  private setItems(items: UserAggregate[]): void {
    items.forEach((item): void => this.addItems(item));
    this.setTotal(items.length);
  }

  public get getItems(): UserAggregate[] {
    return this.items;
  }

  public get getTotal(): number {
    return this.total;
  }

  public hydrate(users: UserAggregate[]): void {
    this.setItems(users);
  }

  public toPrimitives(): IUserSchemaPrimitivesAggregate[] {
    return this.items.map((item): IUserSchemaPrimitivesAggregate => item.toPrimitives());
  }
}

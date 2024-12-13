import { UserModel } from '@user/domain/models/user/user.model';
import {
  IListUserSchemaPrimitive,
  IUserSchemaPrimitive,
} from '@user/domain/schemas/user/user.schema-primitive';

export class ListUserModel {
  private readonly items: UserModel[];
  private total: number;

  constructor(listUser: IListUserSchemaPrimitive) {
    this.items = listUser.items.map((user) => new UserModel(user));
    this.total = listUser.total;
  }

  public get getItems(): IUserSchemaPrimitive[] {
    return this.items.map((user) => user.toPrimitives());
  }

  public get getTotal(): number {
    return this.total;
  }

  public hydrate(users: IUserSchemaPrimitive[]) {
    this.setItems(users);
  }

  private setTotal(total: number) {
    this.total = total;
  }

  private setItems(items: IUserSchemaPrimitive[]) {
    items.forEach((item) => this.addItems(item));
    this.setTotal(items.length);
  }

  private addItems(item: IUserSchemaPrimitive) {
    this.items.push(new UserModel(item));
  }
}

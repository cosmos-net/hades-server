import { UserModel } from '@user/domain/models/user/user.model';
import {
  IListUserSchemaPrimitive,
  IUserSchemaPrimitives,
} from '@user/domain/schemas/user/user.schema-primitive';

export class ListUserModel {
  private readonly items: UserModel[];
  private total: number;

  constructor(listUser: IListUserSchemaPrimitive) {
    this.items = listUser.items.map((user): UserModel => new UserModel(user));
    this.total = listUser.total;
  }

  public get getItems(): IUserSchemaPrimitives[] {
    return this.items.map((user): IUserSchemaPrimitives => user.toPrimitives());
  }

  public get getTotal(): number {
    return this.total;
  }

  public hydrate(users: IUserSchemaPrimitives[]): void {
    this.setItems(users);
  }

  private setTotal(total: number): void {
    this.total = total;
  }

  private setItems(items: IUserSchemaPrimitives[]): void {
    items.forEach((item): void => this.addItems(item));
    this.setTotal(items.length);
  }

  private addItems(item: IUserSchemaPrimitives): void {
    this.items.push(new UserModel(item));
  }
}

import { RoleModel } from '@role/domain/models/role.model';
import {
  IListRoleSchemaPrimitive,
  IRoleSchemaPrimitive,
} from '@role/domain/schemas/role.schema-primitive';

export class ListRoleModel {
  private readonly items: RoleModel[];
  private total: number;

  constructor(listRole: IListRoleSchemaPrimitive) {
    this.items = listRole.items.map((role) => new RoleModel(role));
    this.total = listRole.total;
  }

  public get getItems(): IRoleSchemaPrimitive[] {
    return this.items.map((role) => role.toPrimitives());
  }

  public get getTotal(): number {
    return this.total;
  }

  public hydrate(roles: IRoleSchemaPrimitive[]) {
    this.setItems(roles);
  }

  private setTotal(total: number) {
    this.total = total;
  }

  private setItems(items: IRoleSchemaPrimitive[]) {
    items.forEach((item) => this.addItems(item));
    this.setTotal(items.length);
  }

  private addItems(item: IRoleSchemaPrimitive) {
    this.items.push(new RoleModel(item));
  }
}

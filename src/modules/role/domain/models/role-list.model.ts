import { RoleModel } from '@role/domain/models/role.model';
import {
  IListRoleSchemaPrimitive,
  IRoleSchemaPrimitive,
} from '@role/domain/schemas/role.schema-primitive';

export class ListRoleModel {
  private readonly items: RoleModel[];
  private total: number;

  constructor(listRole: IListRoleSchemaPrimitive) {
    this.items = listRole.items.map((role): RoleModel => new RoleModel(role));
    this.total = listRole.total;
  }

  public get getItems(): IRoleSchemaPrimitive[] {
    return this.items.map((role): IRoleSchemaPrimitive => role.toPrimitives());
  }

  public get getTotal(): number {
    return this.total;
  }

  public hydrate(roles: IRoleSchemaPrimitive[]): void {
    this.setItems(roles);
  }

  private setTotal(total: number): void {
    this.total = total;
  }

  private setItems(items: IRoleSchemaPrimitive[]): void {
    items.forEach((item): void => this.addItems(item));
    this.setTotal(items.length);
  }

  private addItems(item: IRoleSchemaPrimitive): void {
    this.items.push(new RoleModel(item));
  }
}

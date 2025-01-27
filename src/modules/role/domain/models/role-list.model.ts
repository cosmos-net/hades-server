import { RoleModel } from '@role/domain/models/role.model';
import {
  IListRoleSchemaPrimitive,
  IRoleSchemaPrimitives,
} from '@role/domain/schemas/role.schema-primitives';

export class ListRoleModel {
  private readonly items: RoleModel[];
  private total: number;

  constructor(listRole: IListRoleSchemaPrimitive) {
    this.items = listRole.items.map((role): RoleModel => new RoleModel(role));
    this.total = listRole.total;
  }

  public get getItems(): IRoleSchemaPrimitives[] {
    return this.items.map((role): IRoleSchemaPrimitives => role.toPrimitives());
  }

  public get getTotal(): number {
    return this.total;
  }

  public hydrate(roles: IRoleSchemaPrimitives[]): void {
    this.setItems(roles);
  }

  private setTotal(total: number): void {
    this.total = total;
  }

  private setItems(items: IRoleSchemaPrimitives[]): void {
    items.forEach((item): void => this.addItems(item));
    this.setTotal(items.length);
  }

  private addItems(item: IRoleSchemaPrimitives): void {
    this.items.push(new RoleModel(item));
  }
}

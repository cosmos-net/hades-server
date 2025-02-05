import { PermissionModel } from '@permission/domain/models/permission.model';
import {
  IListPermissionSchemaPrimitives,
  IPermissionSchemaPrimitives,
} from '@permission/domain/schemas/permission.schema-primitives';

export class ListPermissionModel {
  private readonly items: PermissionModel[];
  private total: number;

  constructor(listPermission: IListPermissionSchemaPrimitives) {
    this.items = listPermission.items.map(
      (permissions): PermissionModel => new PermissionModel(permissions),
    );
    this.total = listPermission.total;
  }

  public get getItems(): IPermissionSchemaPrimitives[] {
    return this.items.map((permissions): IPermissionSchemaPrimitives => permissions.toPrimitives());
  }

  public get getItemsModel(): PermissionModel[] {
    return this.items;
  }

  public get getTotal(): number {
    return this.total;
  }

  public hydrate(permissions: IPermissionSchemaPrimitives[]): void {
    this.setItems(permissions);
  }

  private setTotal(total: number): void {
    this.total = total;
  }

  private setItems(items: IPermissionSchemaPrimitives[]): void {
    items.forEach((item): void => this.addItems(item));
    this.setTotal(items.length);
  }

  private addItems(item: IPermissionSchemaPrimitives): void {
    this.items.push(new PermissionModel(item));
  }
}

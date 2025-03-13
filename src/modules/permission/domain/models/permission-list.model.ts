import { PermissionModel } from '@permission/domain/models/permission.model';
import {
  IListPermissionSchemaPrimitives,
  IPermissionSchemaPrimitives,
} from '@permission/domain/schemas/permission.schema-primitives';

export class ListPermissionModel {
  private readonly items: PermissionModel[];
  private total: number;

  constructor(listPermission?: IListPermissionSchemaPrimitives) {
    this.items = [];
    this.total = 0;

    if (!listPermission) {
      return;
    }

    this.hydrate(listPermission.items);
  }

  private hydrate(permissions: IPermissionSchemaPrimitives[]): void {
    this.setItems(permissions);
  }

  private setItems(permissions: IPermissionSchemaPrimitives[]): void {
    permissions.forEach((permission): void => {
      this.addItemFromPrimitives(permission);
    });
  }

  private addItemFromPrimitives(item: IPermissionSchemaPrimitives): void {
    this.items.push(PermissionModel.fromPrimitives(item));
    this.incrementTotal();
  }

  public add(permission: PermissionModel): void {
    this.addItemFromModel(permission);
  }

  public remove(permission: PermissionModel): boolean {
    let isPermissionRemoved = false;

    const index = this.items.findIndex((item): boolean => item.uuid === permission.uuid);
    if (index === -1) {
      return isPermissionRemoved;
    }

    isPermissionRemoved = true;
    this.removeItem(index);

    return isPermissionRemoved;
  }

  private removeItem(index: number): void {
    this.items.splice(index, 1);
    this.decrementTotal();
  }

  private addItemFromModel(item: PermissionModel): void {
    this.items.push(item);
    this.incrementTotal();
  }

  private incrementTotal(): void {
    this.total += 1;
  }

  private decrementTotal(): void {
    this.total -= 1;
  }

  public get getItems(): PermissionModel[] {
    return this.items;
  }

  public get getTotal(): number {
    return this.total;
  }

  public toPrimitives(): IListPermissionSchemaPrimitives {
    return {
      total: this.total,
      items: this.items.map((item): IPermissionSchemaPrimitives => item.toPrimitives()),
    };
  }

  public toPartialPrimitives(): Partial<IListPermissionSchemaPrimitives> {
    return {
      total: this.total,
      items: this.items.map((item): IPermissionSchemaPrimitives => item.toPrimitives()),
    };
  }

  public static fromPrimitives(
    listPermission: IListPermissionSchemaPrimitives,
  ): ListPermissionModel {
    return new ListPermissionModel(listPermission);
  }

  public static fromModel(permission: PermissionModel): ListPermissionModel {
    return new ListPermissionModel({ items: [permission.toPrimitives()], total: 1 });
  }

  public static fromModels(permissions: PermissionModel[]): ListPermissionModel {
    return new ListPermissionModel({
      items: permissions.map(
        (permission): IPermissionSchemaPrimitives => permission.toPrimitives(),
      ),
      total: permissions.length,
    });
  }

  public static new(): ListPermissionModel {
    return new ListPermissionModel();
  }
}

import { ProfileModel } from '@user/domain/models/profile/profile.model';
import {
  IListProfileSchemaPrimitive,
  IProfileSchemaPrimitive,
} from '@user/domain/schemas/profile/profile.schema-primitive';

export class ListProfileModel {
  private readonly items: ProfileModel[];
  private total: number;

  constructor(listProfile: IListProfileSchemaPrimitive) {
    this.items = listProfile.items.map((profile) => new ProfileModel(profile));
    this.total = listProfile.total;
  }

  public get getItems(): IProfileSchemaPrimitive[] {
    return this.items.map((profile) => profile.toPrimitives());
  }

  public get getTotal(): number {
    return this.total;
  }

  public hydrate(profiles: IProfileSchemaPrimitive[]) {
    this.setItems(profiles);
  }

  private setTotal(total: number) {
    this.total = total;
  }

  private setItems(items: IProfileSchemaPrimitive[]) {
    items.forEach((item) => this.addItems(item));
    this.setTotal(items.length);
  }

  private addItems(item: IProfileSchemaPrimitive) {
    this.items.push(new ProfileModel(item));
  }
}

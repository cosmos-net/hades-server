import { ProfileModel } from '@user/domain/models/profile/profile.model';
import {
  IListProfileSchemaPrimitive,
  IProfileSchemaPrimitives,
} from '@user/domain/schemas/profile/profile.schema-primitive';

export class ListProfileModel {
  private readonly items: ProfileModel[];
  private total: number;

  constructor(listProfile: IListProfileSchemaPrimitive) {
    this.items = listProfile.items.map((profile): ProfileModel => new ProfileModel(profile));
    this.total = listProfile.total;
  }

  public get getItems(): IProfileSchemaPrimitives[] {
    return this.items.map((profile): IProfileSchemaPrimitives => profile.toPrimitives());
  }

  public get getTotal(): number {
    return this.total;
  }

  public hydrate(profiles: IProfileSchemaPrimitives[]): void {
    this.setItems(profiles);
  }

  private setTotal(total: number): void {
    this.total = total;
  }

  private setItems(items: IProfileSchemaPrimitives[]): void {
    items.forEach((item): void => this.addItems(item));
    this.setTotal(items.length);
  }

  private addItems(item: IProfileSchemaPrimitives): void {
    this.items.push(new ProfileModel(item));
  }
}

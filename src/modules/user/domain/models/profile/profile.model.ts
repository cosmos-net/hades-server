import { AggregateRoot } from '@nestjs/cqrs';

import { Address } from '@common/domain/value-object/vos/address.vo';
import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { DeepPartial } from '@helpers/types/partials.helper';
import { ProfileGenderEnum } from '@user/domain/constants/general-rules';
import { IProfileSchema } from '@user/domain/schemas/profile/profile.schema';
import {
  IProfileAddressSchema,
  IProfileBaseSchema,
  IProfileSchemaPrimitive,
} from '@user/domain/schemas/profile/profile.schema-primitive';
import { Gender } from '@user/domain/value-object/profile/gender.vo';
import { LastName } from '@user/domain/value-object/profile/last-name.vo';
import { Name } from '@user/domain/value-object/profile/name.vo';
import { PhoneNumber } from '@user/domain/value-object/profile/phone-number.vo';
import { SecondLastName } from '@user/domain/value-object/profile/second-last-name.vo';

export class ProfileModel extends AggregateRoot {
  private readonly _entityRoot: IProfileSchema;

  constructor(entity: IProfileSchemaPrimitive);
  constructor(
    uuid: string,
    names: string[],
    lastName: string,
    secondLastName: string,
    phoneNumber: string,
    gender: ProfileGenderEnum,
    address: IProfileAddressSchema,
  );
  constructor(
    entityOrUuid: IProfileSchemaPrimitive | string,
    names?: string[],
    lastName?: string,
    secondLastName?: string,
    phoneNumber?: string,
    gender?: ProfileGenderEnum,
    address?: IProfileAddressSchema,
  ) {
    super();
    if (entityOrUuid instanceof Object) {
      this.hydrate(entityOrUuid);
    } else if (typeof entityOrUuid === 'string') {
      this._entityRoot.uuid = new UUID(entityOrUuid);
      this._entityRoot.names = names.map((name) => new Name(name));
      this._entityRoot.lastName = new LastName(lastName);
      this._entityRoot.secondLastName = new SecondLastName(secondLastName);
      this._entityRoot.phoneNumber = new PhoneNumber(phoneNumber);
      this._entityRoot.gender = new Gender(gender);
      this._entityRoot.address = new Address(address);
    }
  }

  get id(): number | undefined {
    return this._entityRoot.id?._value;
  }

  get uuid(): string {
    return this._entityRoot.uuid._value;
  }

  get names(): string[] {
    return this._entityRoot.names.map((name) => name._value);
  }

  get lastName(): string {
    return this._entityRoot.lastName._value;
  }

  get secondLastName(): string {
    return this._entityRoot.secondLastName._value;
  }

  get phoneNumber(): string {
    return this._entityRoot.phoneNumber._value;
  }

  get gender(): ProfileGenderEnum {
    return this._entityRoot.gender._value;
  }

  get address(): Address {
    return this._entityRoot.address;
  }

  get createdAt(): Date {
    return this._entityRoot.createdAt._value;
  }

  get updatedAt(): Date {
    return this._entityRoot.updatedAt._value;
  }

  get archivedAt(): Date | undefined {
    return this._entityRoot.archivedAt?._value;
  }

  public hydrate(entity: IProfileSchemaPrimitive) {
    //TODO: Handle a domain to emit an event
    if (entity.id) this._entityRoot.id = new Id(entity.id);
    if (entity.archivedAt) this._entityRoot.archivedAt = new ArchivedAt(entity.archivedAt);

    this._entityRoot.uuid = new UUID(entity.uuid);
    this._entityRoot.names = entity.names.map((name) => new Name(name));
    this._entityRoot.lastName = new LastName(entity.lastName);
    this._entityRoot.secondLastName = new SecondLastName(entity.secondLastName);
    this._entityRoot.phoneNumber = new PhoneNumber(entity.phoneNumber);
    this._entityRoot.gender = new Gender(entity.gender);
    this._entityRoot.createdAt = new CreatedAt(entity.createdAt);
    this._entityRoot.updatedAt = new UpdatedAt(entity.updatedAt);

    this._entityRoot.address = new Address({
      street: entity.address.street,
      extNumber: entity.address.extNumber,
      intNumber: entity.address.intNumber,
      neighborhood: entity.address.neighborhood,
      zipCode: entity.address.zipCode,
      city: entity.address.city,
      state: entity.address.state,
      country: entity.address.country,
    });
  }

  public static fromPrimitives(entity: IProfileBaseSchema): ProfileModel {
    return new ProfileModel(
      entity.uuid,
      entity.names,
      entity.lastName,
      entity.secondLastName,
      entity.phoneNumber,
      entity.gender,
      entity.address,
    );
  }

  public toPrimitives(): IProfileSchemaPrimitive {
    return {
      id: this.id,
      uuid: this.uuid,
      names: this.names,
      lastName: this.lastName,
      secondLastName: this.secondLastName,
      phoneNumber: this.phoneNumber,
      gender: this.gender,
      address: {
        street: this.address.street,
        extNumber: this.address.extNumber,
        intNumber: this.address.intNumber,
        neighborhood: this.address.neighborhood,
        zipCode: this.address.zipCode,
        city: this.address.city,
        state: this.address.state,
        country: this.address.country,
      },
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      archivedAt: this.archivedAt,
    };
  }

  public update(entity: DeepPartial<IProfileBaseSchema>) {
    if (entity.names && entity.names.length > 0) {
      this._entityRoot.names = entity.names.map((name) => new Name(name));
    }

    if (entity.lastName) this._entityRoot.lastName = new LastName(entity.lastName);

    if (entity.secondLastName) {
      this._entityRoot.secondLastName = new SecondLastName(entity.secondLastName);
    }

    if (entity.phoneNumber) this._entityRoot.phoneNumber = new PhoneNumber(entity.phoneNumber);
    if (entity.gender) this._entityRoot.gender = new Gender(entity.gender);

    if (entity.address) {
      this._entityRoot.address = new Address({
        ...this._entityRoot.address,
        ...(entity.address.street && { street: entity.address.street }),
        ...(entity.address.extNumber && { extNumber: entity.address.extNumber }),
        ...(entity.address.intNumber && { intNumber: entity.address.intNumber }),
        ...(entity.address.neighborhood && { neighborhood: entity.address.neighborhood }),
        ...(entity.address.zipCode && { zipCode: entity.address.zipCode }),
        ...(entity.address.city && { city: entity.address.city }),
        ...(entity.address.state && { state: entity.address.state }),
        ...(entity.address.country && { country: entity.address.country }),
      });
    }
  }

  public archive() {
    this._entityRoot.archivedAt = new ArchivedAt(new Date());
  }
}

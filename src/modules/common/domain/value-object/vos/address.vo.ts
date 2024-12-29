import InvalidOperationDomainException from '@common/domain/exceptions/invalid-operation.exception';

export interface IAddressSchema {
  street: string;
  extNumber: string;
  intNumber?: string | null;
  neighborhood: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
}

export class Address {
  public readonly _entityRoot: IAddressSchema;

  constructor(address: IAddressSchema) {
    this._entityRoot = {} as IAddressSchema;

    this._entityRoot.street = address.street;
    this._entityRoot.extNumber = address.extNumber;
    this._entityRoot.intNumber = address.intNumber || null;
    this._entityRoot.neighborhood = address.neighborhood;
    this._entityRoot.zipCode = address.zipCode;
    this._entityRoot.city = address.city;
    this._entityRoot.state = address.state;
    this._entityRoot.country = address.country;

    this.validate();
  }

  get street(): string {
    return this._entityRoot.street;
  }

  get extNumber(): string {
    return this._entityRoot.extNumber;
  }

  get intNumber(): string | null {
    return this._entityRoot.intNumber;
  }

  get neighborhood(): string {
    return this._entityRoot.neighborhood;
  }

  get zipCode(): string {
    return this._entityRoot.zipCode;
  }

  get city(): string {
    return this._entityRoot.city;
  }

  get state(): string {
    return this._entityRoot.state;
  }

  get country(): string {
    return this._entityRoot.country;
  }

  public static create(address: Address): Address {
    return new Address({
      street: address._entityRoot.street,
      extNumber: address._entityRoot.extNumber,
      intNumber: address._entityRoot.intNumber || null,
      neighborhood: address._entityRoot.neighborhood,
      zipCode: address._entityRoot.zipCode,
      city: address._entityRoot.city,
      state: address._entityRoot.state,
      country: address._entityRoot.country,
    });
  }

  protected validate(): void {
    if (!this.street) {
      throw new InvalidOperationDomainException('Street is required');
    }

    if (!this.extNumber) {
      throw new InvalidOperationDomainException('External number is required');
    }

    if (!this.neighborhood) {
      throw new InvalidOperationDomainException('Neighborhood is required');
    }

    if (!this.zipCode) {
      throw new InvalidOperationDomainException('Zip code is required');
    }

    if (!this.city) {
      throw new InvalidOperationDomainException('City is required');
    }

    if (!this.state) {
      throw new InvalidOperationDomainException('State is required');
    }

    if (!this.country) {
      throw new InvalidOperationDomainException('Country is required');
    }
  }
}

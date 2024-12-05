import InvalidOperationDomainException from '@common/domain/exceptions/invalid-operation.exception';

export class Address {
  public readonly street: string;
  public readonly extNumber: string;
  public readonly intNumber: string | null;
  public readonly neighborhood: string;
  public readonly zipCode: string;
  public readonly city: string;
  public readonly state: string;
  public readonly country: string;

  constructor(address: Address) {
    this.street = address.street;
    this.extNumber = address.extNumber;
    this.intNumber = address.intNumber;
    this.neighborhood = address.neighborhood;
    this.zipCode = address.zipCode;
    this.city = address.city;
    this.state = address.state;
    this.country = address.country;
  }

  public static create(address: Address): Address {
    return new Address(address);
  }

  public validate(): void {
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

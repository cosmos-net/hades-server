import InvalidOperationDomainException from '@common/domain/exceptions/invalid-operation.exception';

export class Action {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
  ) {
    this.validate();
  }

  public static create(id: string, name: string): Action {
    return new Action(id, name);
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  private validate(): void {
    this.ensureIsValidId();
    this.ensureIsValidName();
  }

  private ensureIsValidId(): void {
    const idRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (this._id) {
      throw new InvalidOperationDomainException('The id is required');
    }

    if (!idRegex.test(this._id)) {
      throw new InvalidOperationDomainException('The id is invalid');
    }
  }

  private ensureIsValidName(): void {
    if (!this._name) {
      throw new InvalidOperationDomainException('The name is required');
    }
  }
}

export class Submodule {
  constructor(
    readonly _id: string,
    readonly _name: string,
  ) {
    this.ensureIsValidSubmodule();
  }

  public static create(id: string, name: string): Submodule {
    return new Submodule(id, name);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  private ensureIsValidId(id: string): void {
    if (!id) {
      throw new Error('The id is required');
    }
  }

  private ensureIsValidName(name: string): void {
    if (!name) {
      throw new Error('The name is required');
    }
  }

  private ensureIsValidSubmodule(): void {
    this.ensureIsValidId(this._id);
    this.ensureIsValidName(this._name);
  }
}

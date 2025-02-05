export class Module {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
  ) {
    this.ensureIsValidModule();
  }

  public static create(id: string, name: string): Module {
    return new Module(id, name);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  private ensureIsValidId(id: string): void {
    if (!id) {
      throw new Error('Module id is required');
    }
  }

  private ensureIsValidName(name: string): void {
    if (!name) {
      throw new Error('Module name is required');
    }
  }

  private ensureIsValidModule(): void {
    this.ensureIsValidId(this._id);
    this.ensureIsValidName(this._name);
  }
}

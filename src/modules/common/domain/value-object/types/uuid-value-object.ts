import { ValueObject } from '@common/domain/value-object/types/value-object';

export class UUIDValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUuid(value);
  }

  private ensureIsValidUuid(id: string): void {
    const regex = new RegExp(
      '^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$',
      'i',
    );

    if (!regex.test(id)) {
      throw new Error(
        `<${this.constructor.name}> does not allow the value <${id}>`,
      );
    }
  }
}

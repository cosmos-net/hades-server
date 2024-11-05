import { AggregateRoot } from '@nestjs/cqrs';
import { RoleReDescribeEvent } from '@role/domain/events/events-success-domain/role-re-describe.event';
import { RoleReNameEvent } from '@role/domain/events/events-success-domain/role-re-name.event';

import { validateNulishString } from '@common/domain/rules/helper';
import Description from '@common/domain/value-object/vos/description.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import Name from '@common/domain/value-object/vos/name.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { IRoleSchema } from '@role/domain/schemas/role.model';

export class RoleModel extends AggregateRoot {
  private readonly _entityRoot: IRoleSchema;

  constructor(id: number, uuid: string, name: string, description?: string) {
    super();
    this._entityRoot.id = new Id(id);
    this._entityRoot.uuid = new UUID(uuid);
    this._entityRoot.name = new Name(name);
    this._entityRoot.description = new Description(description);
  }

  get id(): number {
    return this._entityRoot.id._value;
  }

  get uuid(): string {
    return this._entityRoot.uuid._value;
  }

  get name(): string {
    return this._entityRoot.name._value;
  }

  get description(): string | undefined {
    return this._entityRoot.description._value;
  }

  get createdAt(): Date {
    return this._entityRoot.createdAt._value;
  }

  get updatedAt(): Date {
    return this._entityRoot.updatedAt._value;
  }

  get deletedAt(): Date | undefined {
    return this._entityRoot.deletedAt._value;
  }

  public reDescribe(name?: string, description?: string) {
    if (validateNulishString(name)) {
      this._entityRoot.name = new Name(name);
      this.apply(new RoleReNameEvent(this._entityRoot.uuid._value, name));
    }

    if (validateNulishString(description)) {
      this._entityRoot.description = new Description(description);
      this.apply(new RoleReDescribeEvent(this._entityRoot.uuid._value, description));
    }

    // TODO: use events
  }
}

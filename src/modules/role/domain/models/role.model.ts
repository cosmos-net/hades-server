import { AggregateRoot } from '@nestjs/cqrs';

import Description from '@common/domain/value-object/vos/description.vo';
import Name from '@common/domain/value-object/vos/name.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { validateNullishString } from '@helpers/string/validations-helper';
import { RoleCreatedEvent } from '@role/domain/events/events-success-domain/role-created.event';
import { RoleReDescribeEvent } from '@role/domain/events/events-success-domain/role-redescribed.event';
import { RoleReNameEvent } from '@role/domain/events/events-success-domain/role-renamed.event';
import { IRoleSchema } from '@role/domain/schemas/role.schema';

export class RoleModel extends AggregateRoot {
  private readonly _entityRoot: IRoleSchema;

  constructor(uuid: string, name: string, description?: string) {
    super();
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

  public create() {
    this.apply(new RoleCreatedEvent(this.uuid, this.name));
  }

  public reDescribe(name?: string, description?: string) {
    if (validateNullishString(name)) {
      this._entityRoot.name = new Name(name);
      this.apply(new RoleReNameEvent(this.uuid, name));
    }

    if (validateNullishString(description)) {
      this._entityRoot.description = new Description(description);
      this.apply(new RoleReDescribeEvent(this.uuid, description));
    }
  }
}

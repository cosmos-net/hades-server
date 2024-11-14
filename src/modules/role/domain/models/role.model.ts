import { AggregateRoot } from '@nestjs/cqrs';

import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import Description from '@common/domain/value-object/vos/description.vo';
import Name from '@common/domain/value-object/vos/name.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { validateNullishString } from '@helpers/string/validations-helper';
import { RoleArchivedEvent } from '@role/domain/events/events-success-domain/role-archive.event';
import { RoleCreatedEvent } from '@role/domain/events/events-success-domain/role-created.event';
import { RoleDestroyedEvent } from '@role/domain/events/events-success-domain/role-destroyed.event';
import { RoleReDescribedEvent } from '@role/domain/events/events-success-domain/role-redescribed.event';
import { RoleReNamedEvent } from '@role/domain/events/events-success-domain/role-renamed.event';
import { IRoleSchema } from '@role/domain/schemas/role.schema';
import { IRoleSchemaPrimitive } from '@role/domain/schemas/role.schema-primitive';

export class RoleModel extends AggregateRoot {
  private readonly _entityRoot: IRoleSchema;

  constructor(entity: IRoleSchemaPrimitive);
  constructor(uuid: string, name: string, description?: string);
  constructor(uuidOrSchema: string | IRoleSchemaPrimitive, name?: string, description?: string) {
    super();

    if (typeof uuidOrSchema === 'object') {
      this.hydrate(uuidOrSchema);
    } else {
      this._entityRoot.uuid = new UUID(uuidOrSchema);
      this._entityRoot.name = new Name(name);
      this._entityRoot.createdAt = new UpdatedAt(new Date());
      this._entityRoot.updatedAt = new UpdatedAt(new Date());
      if (description) this._entityRoot.description = new Description(description);
    }
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

  get archivedAt(): Date | undefined {
    return this._entityRoot.archivedAt._value;
  }

  public hydrate(entity: IRoleSchemaPrimitive) {
    this._entityRoot.uuid = new UUID(entity.uuid);
    this._entityRoot.name = new Name(entity.name);
    this._entityRoot.createdAt = new UpdatedAt(entity.createdAt);
    this._entityRoot.updatedAt = new UpdatedAt(entity.updatedAt);

    if (entity.archivedAt) this._entityRoot.archivedAt = new ArchivedAt(entity.archivedAt);
    if (entity.description) this._entityRoot.description = new Description(entity.description);
  }

  public toPrimitives(): IRoleSchemaPrimitive {
    return {
      id: this.id,
      uuid: this.uuid,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      archivedAt: this.archivedAt,
    };
  }

  public create() {
    this.apply(new RoleCreatedEvent(this.uuid, this.name));
  }

  public reDescribe(name?: string, description?: string) {
    const isNameChanged = validateNullishString(name);
    const isDescriptionChanged = validateNullishString(description);
    const isSomethingChanged = isNameChanged || isDescriptionChanged;

    if (!isSomethingChanged) {
      throw new Error('No modified fields detected');
    }

    if (isNameChanged) {
      const legacyName = this.name;
      this._entityRoot.name = new Name(name);
      this.apply(new RoleReNamedEvent(this.uuid, legacyName, name));
    }

    if (isDescriptionChanged) {
      const legacyDescription = this.description;
      this._entityRoot.description = new Description(description);
      this.apply(new RoleReDescribedEvent(this.uuid, legacyDescription, description));
    }

    if (isSomethingChanged) {
      this._entityRoot.updatedAt = new UpdatedAt(new Date());
    }
  }

  public archive(uuid: string, name: string) {
    this._entityRoot.archivedAt = new ArchivedAt(new Date());
    this.apply(new RoleArchivedEvent(uuid, name, this.archivedAt));
  }

  public destroy(uuid: string, name: string) {
    this.apply(new RoleDestroyedEvent(uuid, name, new Date()));
  }
}

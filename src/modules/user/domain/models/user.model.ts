import { AggregateRoot } from '@nestjs/cqrs';

import UUID from '@common/domain/value-object/vos/uuid.vo';
import { StatusEnum } from '@user/domain/enums/user-status-enum';
import { UserCreatedEvent } from '@user/domain/events/events-success-domain/user-created.event';
import { IUserSchema } from '@user/domain/schemas/user.schema';
import { IUserSchemaPrimitive } from '@user/domain/schemas/user.schema-primitive';
import { UserStatus } from '@user/domain/value-object/user-status.vo';

export class UserModel extends AggregateRoot {
  private readonly _entityRoot: IUserSchema;

  constructor(entity: IUserSchemaPrimitive);
  constructor(uuid: string, status: string);
  constructor(uuidOrSchema: string | IUserSchemaPrimitive, status?: StatusEnum) {
    super();

    if (typeof uuidOrSchema === 'object') {
      this.hydrate(uuidOrSchema);
    } else {
      this._entityRoot.uuid = new UUID(uuidOrSchema);
      if (status) this._entityRoot.status = new UserStatus(status);
    }
  }

  get id(): number {
    return this._entityRoot.id._value;
  }

  get uuid(): string {
    return this._entityRoot.uuid._value;
  }

  get status(): StatusEnum {
    return this._entityRoot.status.value;
  }

  public create() {
    this.apply(new UserCreatedEvent(this.uuid, this.status));
  }
  public hydrate(entity: IUserSchemaPrimitive) {
    this._entityRoot.uuid = new UUID(entity.uuid);
    this._entityRoot.status = new UserStatus(entity.status);
  }
}

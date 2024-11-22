import { AggregateRoot } from '@nestjs/cqrs';

import { UserCreatedEvent } from '@user/domain/events/events-success-domain/user-created.event';
import { IUserSchema } from '@user/domain/schemas/user.schema';

export class UserModel extends AggregateRoot {
  private readonly _entityRoot: IUserSchema;

  get id(): number {
    return this._entityRoot.id._value;
  }
  get uuid(): string {
    return this._entityRoot.uuid._value;
  }
  get status(): string {
    return this._entityRoot.status;
  }

  public create() {
    this.apply(new UserCreatedEvent(this.uuid, this.status));
  }
}

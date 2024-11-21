import { AggregateRoot } from '@nestjs/cqrs';

import { IUserSchema } from '@user/domain/schemas/user.schema';

export class UserModel extends AggregateRoot {
  private readonly _entityRoot: IUserSchema;
}

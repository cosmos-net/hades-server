import { AggregateRoot } from '@nestjs/cqrs';

import { UserStatusEnum } from '@common/domain/enums/user-status-enum';
import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { UserArchivedEvent } from '@user/domain/events/events-success-domain/user-archived.event';
import { UserAlreadyArchivedException } from '@user/domain/exceptions/user/user-already-archived.exception';
import { UserNotArchivedException } from '@user/domain/exceptions/user/user-not-archived.exception';
import { IUserSchema } from '@user/domain/schemas/user/user.schema';
import {
  IUserBaseSchema,
  IUserSchemaPrimitives,
} from '@user/domain/schemas/user/user.schema-primitive';
import { UserStatus } from '@user/domain/value-objects/user/user-status.vo';

export class UserModel extends AggregateRoot {
  private readonly _entityRoot: IUserSchema;

  constructor(entity: IUserSchemaPrimitives);
  constructor(uuid: string, status: UserStatusEnum);
  constructor(uuidOrSchema: string | IUserSchemaPrimitives, status?: UserStatusEnum) {
    super();
    this._entityRoot = {} as IUserSchema;

    if (typeof uuidOrSchema === 'object') {
      this.hydrate(uuidOrSchema);
    } else {
      this._entityRoot.uuid = new UUID(uuidOrSchema);
      if (status) this._entityRoot.status = new UserStatus(status);
    }
  }

  get id(): number | undefined {
    return this._entityRoot.id?._value;
  }

  get uuid(): string {
    return this._entityRoot.uuid._value;
  }

  get status(): UserStatusEnum {
    return this._entityRoot.status._value;
  }

  get createdAt(): Date {
    return this._entityRoot.createdAt._value;
  }

  get updatedAt(): Date {
    return this._entityRoot.updatedAt._value;
  }

  get archivedAt(): Date | undefined {
    return this._entityRoot.archivedAt?._value;
  }

  public hydrate(entity: IUserSchemaPrimitives): void {
    this._entityRoot.id = new Id(entity.id);
    this._entityRoot.uuid = new UUID(entity.uuid);
    this._entityRoot.status = new UserStatus(entity.status);
    this._entityRoot.createdAt = new CreatedAt(entity.createdAt);
    this._entityRoot.updatedAt = new CreatedAt(entity.updatedAt);

    if (entity.archivedAt) this._entityRoot.archivedAt = new ArchivedAt(entity.archivedAt);
  }

  public toPrimitives(): IUserSchemaPrimitives {
    return {
      id: this.id,
      uuid: this.uuid,
      status: this.status,
      archivedAt: this.archivedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public toPartialPrimitives(): Partial<IUserSchemaPrimitives> {
    return {
      ...(this.id && { id: this.id }),
      ...(this.uuid && { uuid: this.uuid }),
      ...(this.status && { status: this.status }),
      ...(this.archivedAt && { archivedAt: this.archivedAt }),
      ...(this.createdAt && { createdAt: this.createdAt }),
      ...(this.updatedAt && { updatedAt: this.updatedAt }),
    };
  }

  public archive(): void {
    if (this.archivedAt) {
      throw new UserAlreadyArchivedException(
        `User with uuid ${this.uuid} cannot be archived because it is already archived`,
      );
    }

    if (this.status === UserStatusEnum.ARCHIVED) {
      throw new UserAlreadyArchivedException(
        `User with uuid ${this.uuid} cannot be archived because it is already archived`,
      );
    }

    this._entityRoot.status = new UserStatus(UserStatusEnum.ARCHIVED);
    this._entityRoot.updatedAt = new CreatedAt(new Date());
    this._entityRoot.archivedAt = new ArchivedAt(new Date());

    this.apply(new UserArchivedEvent(this));
  }

  public destroy(): void {
    if (!this.archivedAt) {
      throw new UserNotArchivedException(
        `User with uuid ${this.uuid} cannot be destroyed because it is not archived`,
      );
    }
  }

  public create(): void {
    this._entityRoot.createdAt = new CreatedAt(new Date());
    this._entityRoot.updatedAt = new CreatedAt(new Date());
    this._entityRoot.status = new UserStatus(UserStatusEnum.PENDING);
  }

  public static fromPrimitives(entity: IUserBaseSchema): UserModel {
    return new UserModel(entity.uuid, entity.status);
  }
}

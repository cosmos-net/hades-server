import { AggregateRoot } from '@nestjs/cqrs';

import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { StatusEnum } from '@user/domain/enums/user-status-enum';
import { UserNotArchivedException } from '@user/domain/exceptions/user/user-not-archived.exception';
import { IUserSchema } from '@user/domain/schemas/user/user.schema';
import { IUserBaseSchema, IUserSchemaPrimitives } from '@user/domain/schemas/user/user.schema-primitive';
import { UserStatus } from '@user/domain/value-objects/user/user-status.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';

export class UserModel extends AggregateRoot {
  private readonly _entityRoot: IUserSchema;

  constructor(entity: IUserSchemaPrimitives);
  constructor(uuid: string, status: StatusEnum);
  constructor(uuidOrSchema: string | IUserSchemaPrimitives, status?: StatusEnum) {
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

  get status(): StatusEnum {
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
    this._entityRoot.uuid = new UUID(entity.uuid);
    this._entityRoot.status = new UserStatus(entity.status);
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
    this._entityRoot.archivedAt = new ArchivedAt(new Date());
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
    this._entityRoot.status = new UserStatus(StatusEnum.PENDING);
  }

  public static fromPrimitives(entity: IUserBaseSchema): UserModel {
    return new UserModel(entity.uuid, entity.status);
  }
}

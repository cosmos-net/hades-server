import { AggregateRoot } from '@nestjs/cqrs';

import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Email from '@common/domain/value-object/vos/email.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { ListSessionModel } from '@user/domain/models/session/session-list.model';
import { SessionModel } from '@user/domain/models/session/session.model';
import { IAccountSchema } from '@user/domain/schemas/account/account.schema';
import {
  IAccountBaseSchema,
  IAccountSchemaPrimitives,
} from '@user/domain/schemas/account/account.schema-primitive';
import Password from '@user/domain/value-object/account/password.vo';
import Username from '@user/domain/value-object/account/username.vo';
import { UserNotArchivedException } from '@user/domain/exceptions/user-not-archived.exception';

export class AccountModel extends AggregateRoot {
  private readonly _entityRoot: IAccountSchema;

  constructor(entity: IAccountSchemaPrimitives);
  constructor(uuid: string, username: string, email: string, password: string);
  constructor(
    entityOrUuid: IAccountSchemaPrimitives | string,
    username?: string,
    email?: string,
    password?: string,
  ) {
    super();
    if (entityOrUuid instanceof Object) {
      this.hydrate(entityOrUuid);
    } else if (typeof entityOrUuid === 'string') {
      this._entityRoot.uuid = new UUID(entityOrUuid);
      this._entityRoot.username = new Username(username);
      this._entityRoot.email = new Email(email);
      this._entityRoot.password = new Password(password);
    }
  }

  get id(): number | undefined {
    return this._entityRoot.id?._value;
  }

  get uuid(): string {
    return this._entityRoot.uuid._value;
  }

  get username(): string {
    return this._entityRoot.username._value;
  }

  get email(): string {
    return this._entityRoot.email._value;
  }

  get password(): string {
    return this._entityRoot.password._value;
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

  get sessions(): ListSessionModel {
    return this._entityRoot.sessions;
  }

  public hydrate(entity: IAccountSchemaPrimitives) {
    if (entity.id) this._entityRoot.id = new Id(entity.id);
    if (entity.archivedAt) this._entityRoot.archivedAt = new ArchivedAt(entity.archivedAt);
    if (entity.sessions) {
      this._entityRoot.sessions = new ListSessionModel({
        items: entity.sessions.map((session) => new SessionModel(session)),
        total: entity.sessions.length,
      });
    }

    this._entityRoot.uuid = new UUID(entity.uuid);
    this._entityRoot.username = new Username(entity.username);
    this._entityRoot.email = new Email(entity.email);
    this._entityRoot.password = new Password(entity.password);
    this._entityRoot.createdAt = new CreatedAt(entity.createdAt);
    this._entityRoot.updatedAt = new UpdatedAt(entity.updatedAt);
  }

  public static fromPrimitives(entity: IAccountBaseSchema): AccountModel {
    return new AccountModel(entity.uuid, entity.username, entity.email, entity.password);
  }

  public toPrimitives(): IAccountSchemaPrimitives {
    return {
      id: this.id,
      uuid: this.uuid,
      username: this.username,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      archivedAt: this.archivedAt,
      sessions: this.sessions.getItems,
    };
  }

  public update(entity: Partial<IAccountBaseSchema>): void {
    //TODO: Encrypte username, email and password before update and create
    if (entity.username) this._entityRoot.username = new Username(entity.username);
    if (entity.email) this._entityRoot.email = new Email(entity.email);
    if (entity.password) this._entityRoot.password = new Password(entity.password);

    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    //TODO: Handler a domain to emit an event
  }

  public archive() {
    this._entityRoot.archivedAt = new ArchivedAt(new Date());
    if (this._entityRoot.sessions?.getTotal > 0) {
      this._entityRoot.sessions.archiveSessions();
    }
  }

  public destroy(): void {
    if (!this.archivedAt) {
      throw new UserNotArchivedException(
        `User with uuid ${this.uuid} cannot be destroyed because it is not archived`,
      );
    }
  }
}

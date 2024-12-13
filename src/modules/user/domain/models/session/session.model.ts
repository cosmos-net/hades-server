import { AggregateRoot } from '@nestjs/cqrs';

import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { ISessionSchema } from '@user/domain/schemas/session/session.schema';
import { ISessionSchemaPrimitive } from '@user/domain/schemas/session/session.schema-primitive';
import ExpiresIn from '@user/domain/value-object/session/expires-in.vo';
import SessionFailedAttempts from '@user/domain/value-object/session/failed-attempts.vo';
import SessionIpAddress from '@user/domain/value-object/session/ip-address.vo';
import SessionLocation from '@user/domain/value-object/session/location.vo';
import LoggedInAt from '@user/domain/value-object/session/logged-in-at.vo';
import LoggedOutAt from '@user/domain/value-object/session/logged-out-at.vo';
import SessionOrigin from '@user/domain/value-object/session/origin.vo';
import SessionRefreshToken from '@user/domain/value-object/session/refresh-token.vo';
import SessionClosedType from '@user/domain/value-object/session/session-closed-type.vo';
import SessionDuration from '@user/domain/value-object/session/session-duration.vo';
import SessionId from '@user/domain/value-object/session/session-id.vo';
import SessionType from '@user/domain/value-object/session/session-type.vo';
import SessionToken from '@user/domain/value-object/session/token.vo';
import SessionUserAgent from '@user/domain/value-object/session/user-agent.vo';

export class SessionModel extends AggregateRoot {
  private readonly _entityRoot: ISessionSchema;

  constructor(entity: ISessionSchemaPrimitive) {
    super();
    this.hydrate(entity);
  }

  get id(): number | undefined {
    return this._entityRoot.id?._value;
  }

  get uuid(): string {
    return this._entityRoot.uuid._value;
  }

  get sessionId(): string {
    return this._entityRoot.sessionId._value;
  }

  get sessionType(): string {
    return this._entityRoot.sessionType._value;
  }

  get sessionDuration(): number {
    return this._entityRoot.sessionDuration._value;
  }

  get sessionClosedType(): string {
    return this._entityRoot.sessionClosedType._value;
  }

  get token(): string {
    return this._entityRoot.token._value;
  }

  get expiresIn(): Date {
    return this._entityRoot.expiresIn._value;
  }

  get loggedInAt(): Date {
    return this._entityRoot.loggedInAt._value;
  }

  get loggedOutAt(): Date {
    return this._entityRoot.loggedOutAt._value;
  }

  get ipAddress(): string {
    return this._entityRoot.ipAddress._value;
  }

  get refreshToken(): string {
    return this._entityRoot.refreshToken._value;
  }

  get userAgent(): string {
    return this._entityRoot.userAgent._value;
  }

  get failedAttempts(): number {
    return this._entityRoot.failedAttempts._value;
  }

  get origin(): string {
    return this._entityRoot.origin._value;
  }

  get location(): string {
    return this._entityRoot.location._value;
  }

  get createdAt(): Date {
    return this._entityRoot.createdAt._value;
  }

  get updatedAt(): Date {
    return this._entityRoot.updatedAt._value;
  }

  get archivedAt(): Date {
    return this._entityRoot.archivedAt._value;
  }

  public hydrate(entity: ISessionSchemaPrimitive) {
    if (entity.id) this._entityRoot.id = new Id(entity.id);
    if (entity.archivedAt) this._entityRoot.archivedAt = new ArchivedAt(entity.archivedAt);

    this._entityRoot.uuid = new UUID(entity.uuid);
    this._entityRoot.sessionId = new SessionId(entity.sessionId);
    this._entityRoot.sessionType = new SessionType(entity.sessionType);
    this._entityRoot.sessionDuration = new SessionDuration(entity.sessionDuration);
    this._entityRoot.sessionClosedType = new SessionClosedType(entity.sessionClosedType);
    this._entityRoot.token = new SessionToken(entity.token);
    this._entityRoot.expiresIn = new ExpiresIn(entity.expiresIn);
    this._entityRoot.loggedInAt = new LoggedInAt(entity.loggedInAt);
    this._entityRoot.loggedOutAt = new LoggedOutAt(entity.loggedOutAt);
    this._entityRoot.ipAddress = new SessionIpAddress(entity.ipAddress);
    this._entityRoot.refreshToken = new SessionRefreshToken(entity.refreshToken);
    this._entityRoot.userAgent = new SessionUserAgent(entity.userAgent);
    this._entityRoot.failedAttempts = new SessionFailedAttempts(entity.failedAttempts);
    this._entityRoot.origin = new SessionOrigin(entity.origin);
    this._entityRoot.location = new SessionLocation(entity.location);
    this._entityRoot.createdAt = new CreatedAt(entity.createdAt);
    this._entityRoot.updatedAt = new UpdatedAt(entity.updatedAt);
  }

  public toPrimitives(): ISessionSchemaPrimitive {
    return {
      id: this.id,
      uuid: this.uuid,
      sessionId: this.sessionId,
      sessionType: this.sessionType,
      sessionDuration: this.sessionDuration,
      sessionClosedType: this.sessionClosedType,
      token: this.token,
      expiresIn: this.expiresIn,
      loggedInAt: this.loggedInAt,
      loggedOutAt: this.loggedOutAt,
      ipAddress: this.ipAddress,
      refreshToken: this.refreshToken,
      userAgent: this.userAgent,
      failedAttempts: this.failedAttempts,
      origin: this.origin,
      location: this.location,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      archivedAt: this.archivedAt,
    };
  }

  public archive() {
    this._entityRoot.archivedAt = new ArchivedAt(new Date());
  }
}

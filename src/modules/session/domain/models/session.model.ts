import { AggregateRoot } from '@nestjs/cqrs';

import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';
import { SessionCreatedEvent } from '@session/domain/events/events-success-domain/session-create.event';
import { SessionStatusChangedEvent } from '@session/domain/events/events-success-domain/session-status-changed.event';
import { SessionStatusNotChangedException } from '@session/domain/exceptions/session-status-not-changed.exception';
import { ISessionSchema } from '@session/domain/schemas/session.schema';
import {
  ISessionBaseSchema,
  ISessionSchemaPrimitives,
} from '@session/domain/schemas/session.schema-primitives';
import ExpiresInAt from '@session/domain/value-objects/expires-in.vo';
import SessionFailedAttempts from '@session/domain/value-objects/failed-attempts.vo';
import SessionIpAddress from '@session/domain/value-objects/ip-address.vo';
import SessionLocation from '@session/domain/value-objects/location.vo';
import LoggedInAt from '@session/domain/value-objects/logged-in-at.vo';
import SessionOrigin from '@session/domain/value-objects/origin.vo';
import SessionRefreshToken from '@session/domain/value-objects/refresh-token.vo';
import SessionClosedType from '@session/domain/value-objects/session-closed-type.vo';
import SessionDuration from '@session/domain/value-objects/session-duration.vo';
import SessionId from '@session/domain/value-objects/session-id.vo';
import { SessionStatus } from '@session/domain/value-objects/session-status.vo';
import SessionType from '@session/domain/value-objects/session-type.vo';
import SessionToken from '@session/domain/value-objects/token.vo';
import SessionUserAgent from '@session/domain/value-objects/user-agent.vo';
import { AccountModel } from '@user/domain/models/account/account.model';

export class SessionModel extends AggregateRoot {
  private readonly _entityRoot: ISessionSchema;

  constructor(entity: ISessionSchemaPrimitives);
  constructor(sessionBaseSchema: ISessionBaseSchema);
  constructor(entityOrBaseSchema: ISessionSchemaPrimitives | ISessionBaseSchema) {
    super();
    this._entityRoot = {} as ISessionSchema;

    if ('id' in entityOrBaseSchema) {
      this.hydrate(entityOrBaseSchema);
    } else {
      this._entityRoot.uuid = new UUID(entityOrBaseSchema.uuid);
      this._entityRoot.sessionId = new SessionId(entityOrBaseSchema.sessionId);
      this._entityRoot.sessionType = new SessionType(entityOrBaseSchema.sessionType);
      this._entityRoot.sessionDuration = new SessionDuration(entityOrBaseSchema.sessionDuration);
      this._entityRoot.token = new SessionToken(entityOrBaseSchema.token);
      this._entityRoot.ipAddress = new SessionIpAddress(entityOrBaseSchema.ipAddress);
      this._entityRoot.refreshToken = new SessionRefreshToken(entityOrBaseSchema.refreshToken);
      this._entityRoot.userAgent = new SessionUserAgent(entityOrBaseSchema.userAgent);
      this._entityRoot.origin = new SessionOrigin(entityOrBaseSchema.origin);
      this._entityRoot.location = new SessionLocation(entityOrBaseSchema.location);

      this._entityRoot.status = new SessionStatus(SessionStatusEnum.ACTIVE);
      this._entityRoot.createdAt = new CreatedAt(new Date());
      this._entityRoot.updatedAt = new UpdatedAt(new Date());
    }
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

  get sessionClosedType(): string | undefined {
    return this._entityRoot.sessionClosedType?._value;
  }

  get token(): string {
    return this._entityRoot.token._value;
  }

  get expiresInAt(): Date | undefined {
    return this._entityRoot.expiresInAt?._value;
  }

  get loggedInAt(): Date | undefined {
    return this._entityRoot.loggedInAt?._value;
  }

  get loggedOutAt(): Date | undefined {
    return this._entityRoot.loggedOutAt?._value;
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

  get failedAttempts(): number | undefined {
    return this._entityRoot.failedAttempts?._value;
  }

  get origin(): string {
    return this._entityRoot.origin._value;
  }

  get location(): string {
    return this._entityRoot.location._value;
  }

  get status(): SessionStatusEnum {
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

  get account(): AccountModel | undefined {
    return this._entityRoot?.account;
  }

  private changeStatus(status: SessionStatusEnum): void {
    const currentStatus = this._entityRoot.status._value;

    this.validateStatusChange(currentStatus, status);

    this._entityRoot.status = new SessionStatus(status);
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    this.apply(new SessionStatusChangedEvent(this.toPrimitives()));
  }

  private validateStatusChange(
    currentStatus: SessionStatusEnum,
    newStatus: SessionStatusEnum,
  ): void {
    if (currentStatus === newStatus) {
      throw new SessionStatusNotChangedException(
        `Session with UUID ${this.uuid} has the same status ${currentStatus}`,
      );
    }

    if (this.isFinalStatus(currentStatus)) {
      throw new SessionStatusNotChangedException(
        `Session with UUID ${this.uuid} is already ${currentStatus.toLowerCase()}, cannot change status`,
      );
    }

    if (this.isInvalidStatusChange(currentStatus, newStatus)) {
      throw new SessionStatusNotChangedException(
        `Session with UUID ${this.uuid} is ${currentStatus.toLowerCase()}, cannot change status to ${newStatus.toLowerCase()}`,
      );
    }
  }

  private isFinalStatus(status: SessionStatusEnum): boolean {
    return [
      SessionStatusEnum.EXPIRED,
      SessionStatusEnum.CLOSED,
      SessionStatusEnum.SUSPENDED,
    ].includes(status);
  }

  private isInvalidStatusChange(
    currentStatus: SessionStatusEnum,
    newStatus: SessionStatusEnum,
  ): boolean {
    const invalidTransitions: { [key in SessionStatusEnum]?: SessionStatusEnum[] } = {
      [SessionStatusEnum.ACTIVE]: [SessionStatusEnum.INVALID, SessionStatusEnum.PENDING],
      [SessionStatusEnum.INACTIVE]: [SessionStatusEnum.INVALID, SessionStatusEnum.PENDING],
      [SessionStatusEnum.INVALID]: [
        SessionStatusEnum.INACTIVE,
        SessionStatusEnum.EXPIRED,
        SessionStatusEnum.CLOSED,
        SessionStatusEnum.SUSPENDED,
      ],
      [SessionStatusEnum.PENDING]: [
        SessionStatusEnum.INACTIVE,
        SessionStatusEnum.EXPIRED,
        SessionStatusEnum.CLOSED,
        SessionStatusEnum.SUSPENDED,
      ],
    };

    return invalidTransitions[currentStatus]?.includes(newStatus) ?? false;
  }

  public hydrate(entity: ISessionSchemaPrimitives): void {
    if (entity.id) this._entityRoot.id = new Id(entity.id);
    if (entity.archivedAt) this._entityRoot.archivedAt = new ArchivedAt(entity.archivedAt);
    if (entity.loggedOutAt) this._entityRoot.loggedOutAt = new LoggedInAt(entity.loggedOutAt);
    if (entity.loggedInAt) this._entityRoot.loggedInAt = new LoggedInAt(entity.loggedInAt);
    if (entity.sessionClosedType)
      this._entityRoot.sessionClosedType = new SessionClosedType(entity.sessionClosedType);
    if (entity.expiresInAt) this._entityRoot.expiresInAt = new ExpiresInAt(entity.expiresInAt);

    if (entity.failedAttempts)
      this._entityRoot.failedAttempts = new SessionFailedAttempts(entity.failedAttempts);

    this._entityRoot.uuid = new UUID(entity.uuid);
    this._entityRoot.sessionId = new SessionId(entity.sessionId);
    this._entityRoot.sessionType = new SessionType(entity.sessionType);
    this._entityRoot.sessionDuration = new SessionDuration(entity.sessionDuration);
    this._entityRoot.token = new SessionToken(entity.token);
    this._entityRoot.ipAddress = new SessionIpAddress(entity.ipAddress);
    this._entityRoot.refreshToken = new SessionRefreshToken(entity.refreshToken);
    this._entityRoot.userAgent = new SessionUserAgent(entity.userAgent);
    this._entityRoot.origin = new SessionOrigin(entity.origin);
    this._entityRoot.location = new SessionLocation(entity.location);
    this._entityRoot.createdAt = new CreatedAt(entity.createdAt);
    this._entityRoot.updatedAt = new UpdatedAt(entity.updatedAt);
    this._entityRoot.status = new SessionStatus(entity.status);
  }

  public toPrimitives(): ISessionSchemaPrimitives {
    return {
      id: this.id,
      uuid: this.uuid,
      sessionId: this.sessionId,
      sessionType: this.sessionType,
      sessionDuration: this.sessionDuration,
      sessionClosedType: this.sessionClosedType,
      token: this.token,
      expiresInAt: this.expiresInAt,
      loggedInAt: this.loggedInAt,
      loggedOutAt: this.loggedOutAt,
      ipAddress: this.ipAddress,
      refreshToken: this.refreshToken,
      userAgent: this.userAgent,
      failedAttempts: this.failedAttempts,
      origin: this.origin,
      location: this.location,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      archivedAt: this.archivedAt,
    };
  }

  public toPartialPrimitives(): Partial<ISessionSchemaPrimitives> {
    //TODO: Refactor this
    return {
      ...(this.id && { id: this.id }),
      ...(this.uuid && { uuid: this.uuid }),
      ...(this.sessionId && { sessionId: this.sessionId }),
      ...(this.sessionType && { sessionType: this.sessionType }),
      ...(this.sessionDuration && { sessionDuration: this.sessionDuration }),
      ...(this.sessionClosedType && { sessionClosedType: this.sessionClosedType }),
      ...(this.token && { token: this.token }),
      ...(this.expiresInAt && { expiresIn: this.expiresInAt }),
      ...(this.loggedInAt && { loggedInAt: this.loggedInAt }),
      ...(this.loggedOutAt && { loggedOutAt: this.loggedOutAt }),
      ...(this.ipAddress && { ipAddress: this.ipAddress }),
      ...(this.refreshToken && { refreshToken: this.refreshToken }),
      ...(this.userAgent && { userAgent: this.userAgent }),
      ...(this.failedAttempts && { failedAttempts: this.failedAttempts }),
      ...(this.origin && { origin: this.origin }),
      ...(this.location && { location: this.location }),
      ...(this.status && { status: this.status }),
      ...(this.createdAt && { createdAt: this.createdAt }),
      ...(this.updatedAt && { updatedAt: this.updatedAt }),
      ...(this.archivedAt && { archivedAt: this.archivedAt }),
    };
  }

  public static fromPrimitives(entity: ISessionBaseSchema): SessionModel {
    return new SessionModel(entity);
  }

  public useAccount(account: AccountModel): void {
    this._entityRoot.account = account;
  }

  public archive(): void {
    this._entityRoot.archivedAt = new ArchivedAt(new Date());
  }

  public create(): void {
    this.apply(new SessionCreatedEvent(this.toPrimitives()));
  }

  public active(): void {
    this.changeStatus(SessionStatusEnum.ACTIVE);
  }
}

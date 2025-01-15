import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';

export interface ISessionBaseSchema {
  uuid: string;
  sessionId?: string;
  sessionType: string;
  sessionDuration?: number | null;
  token?: string | null;
  ipAddress: string;
  refreshToken?: string | null;
  userAgent: string;
  origin: string;
  location: string;
}

export interface ISessionSchemaPrimitives extends ISessionBaseSchema {
  id: number;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date;
  sessionClosedType: string;
  loggedInAt?: Date | null;
  expiresInAt?: Date | null;
  status: SessionStatusEnum;
  loggedOutAt?: Date | null;
  failedAttempts: number;
}

export interface IListSessionSchemaPrimitives {
  total: number;
  items: ISessionSchemaPrimitives[];
}

export type SessionInvalidType = Pick<
  ISessionSchemaPrimitives,
  'uuid' | 'sessionType' | 'ipAddress' | 'userAgent' | 'origin' | 'location'
>;

export type ISessionActivateInvalidSchemaPrimitives = Pick<
  ISessionSchemaPrimitives,
  'uuid' | 'sessionDuration' | 'token' | 'expiresInAt' | 'loggedInAt' | 'refreshToken'
>;

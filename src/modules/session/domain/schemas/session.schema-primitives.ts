import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';

export interface ISessionBaseSchema {
  uuid: string;
  sessionId: string;
  sessionType: string;
  sessionDuration: number;
  token: string;
  ipAddress: string;
  refreshToken: string;
  userAgent: string;
  failedAttempts: number;
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
  loggedInAt: Date;
  expiresInAt: Date;
  status: SessionStatusEnum;
}

export interface IListSessionSchemaPrimitives {
  total: number;
  items: ISessionSchemaPrimitives[];
}

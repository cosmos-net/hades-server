export interface ISessionSchemaPrimitive {
  id: number;
  uuid: string;
  sessionId: string;
  sessionType: string;
  sessionDuration: number;
  sessionClosedType: string;
  token: string;
  expiresIn: Date;
  loggedInAt: Date;
  loggedOutAt?: Date;
  ipAddress: string;
  refreshToken: string;
  userAgent: string;
  failedAttempts: number;
  origin: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date;
}

export interface IListSessionSchemaPrimitive {
  total: number;
  items: ISessionSchemaPrimitive[];
}

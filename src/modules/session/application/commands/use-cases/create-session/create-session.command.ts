import { ICommand } from '@nestjs/cqrs';

export class CreateSessionCommand implements ICommand {
  public readonly uuid: string;
  public readonly sessionId: string;
  public readonly sessionType: string;
  public readonly sessionDuration: number;
  public readonly sessionClosedType: string;
  public readonly token: string;
  public readonly ipAddress: string;
  public readonly refreshToken: string;
  public readonly userAgent: string;
  public readonly failedAttempts: number;
  public readonly origin: string;
  public readonly location: string;

  constructor(root: CreateSessionCommand) {
    this.uuid = root.uuid;
    this.sessionId = root.sessionId;
    this.sessionType = root.sessionType;
    this.sessionDuration = root.sessionDuration;
    this.sessionClosedType = root.sessionClosedType;
    this.sessionClosedType = root.sessionClosedType;
    this.token = root.token;
    this.ipAddress = root.ipAddress;
    this.refreshToken = root.refreshToken;
    this.userAgent = root.userAgent;
    this.failedAttempts = root.failedAttempts;
    this.origin = root.origin;
    this.location = root.location;
  }
}

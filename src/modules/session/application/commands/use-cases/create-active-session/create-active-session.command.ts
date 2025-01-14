import { ICommand } from '@nestjs/cqrs';

export class CreateActiveSessionCommand implements ICommand {
  public readonly uuid: string;
  public readonly sessionId: string;
  public readonly sessionType: string;
  public readonly sessionDuration: number;
  public readonly token: string;
  public readonly ipAddress: string;
  public readonly refreshToken: string;
  public readonly userAgent: string;
  public readonly origin: string;
  public readonly location: string;
  public readonly accountUUID: string;

  constructor(root: CreateActiveSessionCommand) {
    this.uuid = root.uuid;
    this.sessionId = root.sessionId;
    this.sessionType = root.sessionType;
    this.sessionDuration = root.sessionDuration;
    this.token = root.token;
    this.ipAddress = root.ipAddress;
    this.refreshToken = root.refreshToken;
    this.userAgent = root.userAgent;
    this.origin = root.origin;
    this.location = root.location;
    this.accountUUID = root.accountUUID;
  }
}

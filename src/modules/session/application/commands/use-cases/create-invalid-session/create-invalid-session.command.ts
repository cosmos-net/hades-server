import { ICommand } from '@nestjs/cqrs';

export class CreateInvalidSessionCommand implements ICommand {
  public readonly uuid: string;
  public readonly sessionType: string;
  public readonly ipAddress: string;
  public readonly userAgent: string;
  public readonly origin: string;
  public readonly location: string;
  public readonly accountUUID: string;

  constructor(root: CreateInvalidSessionCommand) {
    this.uuid = root.uuid;
    this.sessionType = root.sessionType;
    this.ipAddress = root.ipAddress;
    this.userAgent = root.userAgent;
    this.origin = root.origin;
    this.location = root.location;
    this.accountUUID = root.accountUUID;
  }
}

import { ICommand } from '@nestjs/cqrs';

export class ActivateInvalidSessionCommand implements ICommand {
  public readonly uuid: string;
  public readonly sessionDuration: number;
  public readonly token: string;
  public readonly expiresInAt: Date;
  public readonly loggedInAt: Date;
  public readonly refreshToken: string;

  constructor(root: ActivateInvalidSessionCommand) {
    this.uuid = root.uuid;
    this.sessionDuration = root.sessionDuration;
    this.token = root.token;
    this.expiresInAt = root.expiresInAt;
    this.loggedInAt = root.loggedInAt;
    this.refreshToken = root.refreshToken;
  }
}

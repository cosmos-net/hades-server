import { ICommand } from '@nestjs/cqrs';

export class UpdateSessionCommand implements ICommand {
  public readonly uuid: string;
  public readonly sessionClosedType: string;
  public readonly loggedOutAt: Date;
  public readonly refreshToken: string;
  public readonly failedAttempts: number;

  constructor(root: UpdateSessionCommand) {
    this.uuid = root.uuid;
    this.sessionClosedType = root.sessionClosedType;
    this.loggedOutAt = root.loggedOutAt;
    this.refreshToken = root.refreshToken;
    this.failedAttempts = root.failedAttempts;
  }
}

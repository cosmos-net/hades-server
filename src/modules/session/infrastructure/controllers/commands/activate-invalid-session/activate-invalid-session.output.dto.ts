export class ActivateInvalidSessionOutputDto {
  public readonly id: number;
  public readonly uuid: string;
  public readonly sessionClosedType: string;
  public readonly loggedOutAt: Date;
  public readonly refreshToken: string;
  public readonly failedAttempts: number;

  constructor(root: ActivateInvalidSessionOutputDto) {
    this.id = root.id;
    this.uuid = root.uuid;
    this.sessionClosedType = root.sessionClosedType;
    this.loggedOutAt = root.loggedOutAt;
    this.refreshToken = root.refreshToken;
    this.failedAttempts = root.failedAttempts;
  }
}

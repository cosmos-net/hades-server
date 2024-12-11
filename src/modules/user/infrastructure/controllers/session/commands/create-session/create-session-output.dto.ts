export class CreateSessionOutputDto {
  public readonly uuid: string;
  public readonly token: string;
  public readonly expiresAt: Date;
  public readonly createdAt: Date;
}

import { SessionModel } from '@session/domain/models/session.model';

// TODO: handler other properties to response api
export class TransitionDynamicStatusSessionOutputDto {
  public readonly id: number;
  public readonly uuid: string;
  public readonly status: string;
  public readonly message: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly archivedAt: Date;

  constructor(root: SessionModel, message: string) {
    this.id = root.id;
    this.uuid = root.uuid;
    this.status = root.status;
    this.message = message;
    this.createdAt = root.createdAt;
    this.updatedAt = root.updatedAt;
    this.archivedAt = root.archivedAt;
  }
}

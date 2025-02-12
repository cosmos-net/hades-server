import { IsUUID } from 'class-validator';

export class DestroyPermissionInputDto {
  @IsUUID()
  public readonly uuid: string;
}

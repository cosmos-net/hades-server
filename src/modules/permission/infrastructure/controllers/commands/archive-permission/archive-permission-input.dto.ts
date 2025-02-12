import { IsUUID } from 'class-validator';

export class ArchivePermissionInputDto {
  @IsUUID()
  public readonly uuid: string;
}

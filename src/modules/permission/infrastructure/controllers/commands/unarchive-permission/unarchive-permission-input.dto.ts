import { IsUUID } from 'class-validator';

export class UnarchivePermissionInputDto {
  @IsUUID()
  public readonly uuid: string;
}

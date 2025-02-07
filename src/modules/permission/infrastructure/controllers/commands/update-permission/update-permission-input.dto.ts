import { IsString, IsUUID } from 'class-validator';

export class UpdatePermissionInputDto {
  @IsUUID()
  public readonly uuid: string;

  @IsString()
  public readonly description: string;
}

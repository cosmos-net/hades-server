import { IsUUID } from 'class-validator';

export class ArchiveRoleInputDto {
  @IsUUID()
  public readonly uuid: string;
}

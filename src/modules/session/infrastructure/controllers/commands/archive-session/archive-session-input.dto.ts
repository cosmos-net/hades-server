import { IsUUID } from 'class-validator';

export class ArchiveSessionInputDto {
  @IsUUID()
  public readonly uuid: string;
}

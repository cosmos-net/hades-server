import { IsUUID } from 'class-validator';

export class ArchiveAssignmentInputDto {
  @IsUUID()
  public readonly uuid: string;
}

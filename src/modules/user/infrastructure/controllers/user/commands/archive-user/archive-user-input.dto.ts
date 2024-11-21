import { IsUUID } from 'class-validator';

export class ArchiveUserInputDto {
  @IsUUID()
  public readonly uuid: string;
}

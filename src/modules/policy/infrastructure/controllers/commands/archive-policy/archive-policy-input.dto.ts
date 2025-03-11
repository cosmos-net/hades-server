import { IsUUID } from 'class-validator';

export class ArchivePolicyInputDto {
  @IsUUID()
  public readonly uuid: string;
}

import { IsUUID } from 'class-validator';

export class DestroyAssignmentInputDto {
  @IsUUID()
  public readonly uuid: string;
}

import { IsUUID } from 'class-validator';

export class DestroyRoleInputDto {
  @IsUUID()
  public readonly uuid: string;
}

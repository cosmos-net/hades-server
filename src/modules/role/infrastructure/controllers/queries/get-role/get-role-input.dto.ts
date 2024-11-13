import { IsUUID } from 'class-validator';

export class GetRoleInputDto {
  @IsUUID()
  public readonly uuid: string;
}

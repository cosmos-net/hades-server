import { IsUUID } from 'class-validator';

export class DestroyUserInputDto {
  @IsUUID()
  public readonly uuid: string;
}

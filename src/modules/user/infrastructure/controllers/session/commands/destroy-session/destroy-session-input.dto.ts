import { IsUUID } from 'class-validator';

export class DestroySessionInputDto {
  @IsUUID()
  public readonly uuid: string;
}

import { IsUUID } from 'class-validator';

export class GetUserInputDto {
  @IsUUID()
  public readonly uuid: string;
}

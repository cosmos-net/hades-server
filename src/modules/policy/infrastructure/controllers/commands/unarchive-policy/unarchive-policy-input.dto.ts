import { IsUUID } from 'class-validator';

export class UnarchivePolicyInputDto {
  @IsUUID()
  public readonly uuid: string;
}

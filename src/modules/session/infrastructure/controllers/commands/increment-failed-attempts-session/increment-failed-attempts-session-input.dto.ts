import { IsUUID } from 'class-validator';

export class IncrementFailedAttemptsSessionInputDto {
  @IsUUID()
  public readonly uuid: string;
}

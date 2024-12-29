import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class GetUserInputDto {
  @IsUUID()
  public readonly uuid: string;

  @IsOptional()
  @Transform(({ value }): boolean => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  })
  @IsBoolean()
  public readonly withArchived: boolean = false;
}

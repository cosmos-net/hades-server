import { IsBoolean, IsEmail, IsOptional } from 'class-validator';

export class SearchAccountByEmailInputDto {
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsBoolean()
  readonly withArchived?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly failIfArchived?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly includeSessions?: boolean;
}

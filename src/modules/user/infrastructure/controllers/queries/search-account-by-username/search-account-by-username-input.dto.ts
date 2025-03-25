import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SearchAccountByUsernameInputDto {
  @IsString()
  readonly username: string;

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

import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserRoleAssignmentInput {
  @IsUUID()
  public readonly userUUID: string;

  @IsUUID()
  public readonly roleUUID: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly description?: string;
}

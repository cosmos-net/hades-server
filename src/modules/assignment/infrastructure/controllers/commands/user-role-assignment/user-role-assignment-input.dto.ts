import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserRoleAssignmentInput {
  @IsUUID()
  public readonly userUUID: string;

  @IsUUID()
  public readonly roleUUID: string;

  @IsString()
  @IsNotEmpty()
  public readonly description: string;
}

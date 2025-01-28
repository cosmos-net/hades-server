import { IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';

export class UpdateAssignmentInput {
  @IsUUID()
  public readonly uuid: string;

  @ValidateIf((o): boolean => o.description === undefined)
  @IsUUID()
  public readonly roleUUID?: string;

  @ValidateIf((o): boolean => o.roleUUID === undefined)
  @IsString()
  @IsNotEmpty()
  public readonly description?: string;
}

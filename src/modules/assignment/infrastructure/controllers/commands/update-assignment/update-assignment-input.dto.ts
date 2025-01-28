import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateAssignmentInput {
  @IsUUID()
  public readonly uuid: string;

  @IsUUID()
  @IsOptional()
  public readonly roleUUID?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly description?: string;
}

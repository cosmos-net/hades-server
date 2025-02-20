import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePolicyInputDto {
  @IsUUID()
  roleUUID: string;

  @IsUUID('4', { each: true })
  permissionUUIDs: string[];

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string;
}

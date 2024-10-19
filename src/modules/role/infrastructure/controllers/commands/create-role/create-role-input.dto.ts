import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateRoleInput {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(5, 200)
  public readonly description: string;
}

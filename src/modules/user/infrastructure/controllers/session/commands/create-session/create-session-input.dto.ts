import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSessionInput {
  @IsString()
  @IsNotEmpty()
  public readonly token: string;
}

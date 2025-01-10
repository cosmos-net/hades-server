import { IsNotEmpty, IsUUID, IsEnum } from 'class-validator';

import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';

export class TransitionDynamicStatusSessionInputDto {
  @IsUUID()
  @IsNotEmpty()
  public readonly uuid: string;

  @IsEnum(SessionStatusEnum)
  @IsNotEmpty()
  public readonly from: SessionStatusEnum;

  @IsEnum(SessionStatusEnum)
  @IsNotEmpty()
  public readonly to: SessionStatusEnum;
}

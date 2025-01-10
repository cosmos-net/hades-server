import { EnumValueObject } from '@common/domain/value-object/types/enum-value-object';
import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';
import { SessionStatusNotChangedException } from '@session/domain/exceptions/session-status-not-changed.exception';
import { SessionStatusManager } from '@session/domain/models/session-status-manager';

export class SessionStatus extends EnumValueObject<SessionStatusEnum> {
  constructor(value: SessionStatusEnum) {
    super(value, Object.values(SessionStatusEnum));
  }

  protected throwErrorForInvalidValue(value: SessionStatusEnum): void {
    throw new Error(`Invalid status: ${value}`);
  }

  public static createWithTransition(
    from: SessionStatusEnum,
    to: SessionStatusEnum,
  ): SessionStatus {
    const canTransitionStatus = SessionStatusManager.canTransition(from, to);

    if (!canTransitionStatus) {
      throw new SessionStatusNotChangedException(
        `Invalid transition of status from ${from} to ${to}`,
      );
    }

    return new SessionStatus(to);
  }
}

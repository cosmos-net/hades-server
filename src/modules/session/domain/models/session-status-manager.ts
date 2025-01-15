import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';

export class SessionStatusManager {
  private static readonly FINAL_STATUSES = [
    SessionStatusEnum.EXPIRED,
    SessionStatusEnum.CLOSED,
    SessionStatusEnum.SUSPENDED,
  ];

  private static readonly INVALID_TRANSITIONS: {
    [key in SessionStatusEnum]?: SessionStatusEnum[];
  } = {
    [SessionStatusEnum.ACTIVE]: [SessionStatusEnum.INVALID, SessionStatusEnum.PENDING],
    [SessionStatusEnum.INACTIVE]: [SessionStatusEnum.INVALID, SessionStatusEnum.PENDING],
    [SessionStatusEnum.INVALID]: [
      SessionStatusEnum.INACTIVE,
      SessionStatusEnum.EXPIRED,
      SessionStatusEnum.CLOSED,
      SessionStatusEnum.SUSPENDED,
    ],
    [SessionStatusEnum.PENDING]: [
      SessionStatusEnum.INACTIVE,
      SessionStatusEnum.EXPIRED,
      SessionStatusEnum.CLOSED,
      SessionStatusEnum.SUSPENDED,
    ],
  };

  private static readonly ALLOWED_TRANSITIONS: {
    [key in SessionStatusEnum]?: SessionStatusEnum[];
  } = {
    [SessionStatusEnum.ACTIVE]: [
      SessionStatusEnum.INACTIVE,
      SessionStatusEnum.EXPIRED,
      SessionStatusEnum.CLOSED,
      SessionStatusEnum.SUSPENDED,
    ],
    [SessionStatusEnum.INACTIVE]: [
      SessionStatusEnum.ACTIVE,
      SessionStatusEnum.EXPIRED,
      SessionStatusEnum.CLOSED,
      SessionStatusEnum.SUSPENDED,
    ],
    [SessionStatusEnum.INVALID]: [SessionStatusEnum.ACTIVE],
    [SessionStatusEnum.PENDING]: [SessionStatusEnum.ACTIVE],
  };

  private static isFinalStatus(status: SessionStatusEnum): boolean {
    return this.FINAL_STATUSES.includes(status);
  }

  private static isInvalidTransition(from: SessionStatusEnum, to: SessionStatusEnum): boolean {
    return this.INVALID_TRANSITIONS[from]?.includes(to) || false;
  }

  private static isAllowedTransition(from: SessionStatusEnum, to: SessionStatusEnum): boolean {
    return this.ALLOWED_TRANSITIONS[from]?.includes(to) || false;
  }

  public static canTransition(from: SessionStatusEnum, to: SessionStatusEnum): boolean {
    if (this.isFinalStatus(from)) {
      return false;
    }

    if (this.isInvalidTransition(from, to)) {
      return false;
    }

    if (!this.isAllowedTransition(from, to)) {
      return false;
    }

    return true;
  }
}

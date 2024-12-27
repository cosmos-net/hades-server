export const MAX_PROFILE_NAME_LENGTH = 100;
export const MIN_PROFILE_NAME_LENGTH = 2;

export const MAX_PROFILE_LAST_NAME_LENGTH = 100;
export const MIN_PROFILE_LAST_NAME_LENGTH = 2;

export const MAX_PROFILE_SECOND_LAST_NAME_LENGTH = 100;
export const MIN_PROFILE_SECOND_LAST_NAME_LENGTH = 2;

export const MAX_PROFILE_PHONE_NUMBER_LENGTH = 13;
export const MIN_PROFILE_PHONE_NUMBER_LENGTH = 9;

export const PROFILE_ADDRESS = {
  STREET: {
    MAX_LENGTH: 100,
    MIN_LENGTH: 2,
  },
  EXT_NUMBER: {
    MAX_LENGTH: 10,
    MIN_LENGTH: 1,
  },
  INT_NUMBER: {
    MAX_LENGTH: 10,
    MIN_LENGTH: 1,
  },
  NEIGHBORHOOD: {
    MAX_LENGTH: 100,
    MIN_LENGTH: 2,
  },
  ZIP_CODE: {
    MAX_LENGTH: 10,
    MIN_LENGTH: 2,
  },
  CITY: {
    MAX_LENGTH: 100,
    MIN_LENGTH: 2,
  },
  STATE: {
    MAX_LENGTH: 100,
    MIN_LENGTH: 2,
  },
  COUNTRY: {
    MAX_LENGTH: 100,
    MIN_LENGTH: 2,
  },
};

export enum ProfileGenderEnum {
  MAN = 'MAN',
  WOMAN = 'WOMAN',
}

export const MAX_ACCOUNT_USER_NAME_LENGTH = 100;
export const MIN_ACCOUNT_USER_NAME_LENGTH = 5;

export const MAX_ACCOUNT_EMAIL_LENGTH = 255;
export const MIN_ACCOUNT_EMAIL_LENGTH = 5;

export const MAX_ACCOUNT_PASSWORD_LENGTH = 100;
export const MIN_ACCOUNT_PASSWORD_LENGTH = 5;

export enum UserStatusEnum {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  PENDING = 'Pending',
  SUSPENDED = 'Suspended',
  ARCHIVED = 'Archived',
  BANNED = 'Banned',
  UNDER_REVIEW = 'UnderReview',
}

// TODO: Use in value objects
// TODO: Use in dtos
// TODO: Use in entities
export const SESSION = {
  SESSION_ID: {
    MAX_LENGTH: 255,
    MIN_LENGTH: 1,
  },
  SESSION_TYPE: {
    MAX_LENGTH: 50,
    MIN_LENGTH: 1,
  },
  SESSION_DURATION: {
    MAX_LENGTH: 50,
    MIN_LENGTH: 1,
  },
  SESSION_CLOSED_TYPE: {
    MAX_LENGTH: 50,
    MIN_LENGTH: 1,
  },
  TOKEN: {
    MAX_LENGTH: 1000,
    MIN_LENGTH: 1,
  },
  IP_ADDRESS: {
    MAX_LENGTH: 100,
    MIN_LENGTH: 1,
  },
  REFRESH_TOKEN: {
    MAX_LENGTH: 255,
    MIN_LENGTH: 1,
  },
  USER_AGENT: {
    MAX_LENGTH: 255,
    MIN_LENGTH: 1,
  },
  ORIGIN: {
    MAX_LENGTH: 100,
    MIN_LENGTH: 1,
  },
  LOCATION: {
    MAX_LENGTH: 100,
    MIN_LENGTH: 1,
  },
};

export const CMDS_HADES = {
  ROLE: {
    CREATE: 'HADES.ROLE.CREATE',
    DESTROY: 'HADES.ROLE.DESTROY',
    ARCHIVE: 'HADES.ROLE.ARCHIVE',
    UPDATE: 'HADES.ROLE.UPDATE',
    LIST: 'HADES.ROLE.LIST',
    GET: 'HADES.ROLE.GET',
  },
  USER: {
    CREATE: 'HADES.USER.CREATE',
    DESTROY: 'HADES.USER.DESTROY',
    ARCHIVE: 'HADES.USER.ARCHIVE',
    UPDATE: 'HADES.USER.UPDATE',
    LIST: 'HADES.USER.LIST',
    GET: 'HADES.USER.GET',
  },
  SESSION: {
    CREATE: 'HADES.SESSION.CREATE',
    ARCHIVE: 'HADES.SESSION.ARCHIVE',
    DESTROY: 'HADES.SESSION.DESTROY',
    UPDATE: 'HADES.SESSION.UPDATE',
    INCREMENT_FAILED_ATTEMPTS: 'HADES.SESSION.INCREMENT_FAILED_ATTEMPTS',
    ACTIVATE_INVALID: 'HADES.SESSION.ACTIVATE_INVALID',
    TRANSITION_STATUS: 'HADES.SESSION.TRANSITION_STATUS',
    GET: 'HADES.SESSION.GET',
    LIST: 'HADES.SESSION.LIST',
  },
};

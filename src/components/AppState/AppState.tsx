import React from 'react';

import { AppStateShape } from 'interfaces/interfaces';

const appBasePath = process.env.REACT_APP_BASE_PATH;

export const initialState: AppStateShape = {
  appSettings: {
    appBasePath: typeof appBasePath === 'undefined' ? '' : appBasePath
  },
  systemSettings: {},
  user: {
    isAuth: false,
    sessionExpired: false
  },
  statuses: []
};

export const AppContext = React.createContext<AppStateShape | any>(
  initialState
);

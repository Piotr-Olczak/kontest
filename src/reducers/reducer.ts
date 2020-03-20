import { combineReducers } from 'redux';

import { appSettingsReducer } from './appSettingsReducer';
import { systemSettingsReducer } from './systemSettingsReducer';
import { userReducer } from './userReducer';
import { statusesReducer } from './statusesReducer';

export const rootReducer = combineReducers({
  appSettings: appSettingsReducer,
  systemSettings: systemSettingsReducer,
  user: userReducer,
  statuses: statusesReducer
});

import { SystemSettingsShape, ActionShape } from 'interfaces/interfaces';

import { initialState } from 'components/AppState/AppState';

export const systemSettingsReducer = (
  state: SystemSettingsShape = initialState.systemSettings,
  action: ActionShape
): SystemSettingsShape => {
  switch (action.type) {
    case 'setSystemSettings':
      return {
        ...action.payload
      };
    case 'setMinPasswordLength':
      return {
        ...state,
        passwordMinLength: action.payload
      };
    default:
      return { ...state };
  }
};

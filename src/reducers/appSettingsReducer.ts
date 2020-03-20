import { ActionShape, AppSettingsShape } from 'interfaces/interfaces';
import { initialState } from 'components/AppState/AppState';

export const appSettingsReducer = (
  state: AppSettingsShape = initialState.appSettings,
  action: ActionShape
): AppSettingsShape => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

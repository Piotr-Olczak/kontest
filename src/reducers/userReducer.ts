import { initialState } from 'components/AppState/AppState';
import { ActionShape, UserShape } from 'interfaces/interfaces';

export const userReducer = (
  state: UserShape = initialState.user,
  action: ActionShape
): UserShape => {
  switch (action.type) {
    case 'setUserDetailsAndAuth':
      return {
        ...state,
        isAuth: action.payload.auth,
        sessionExpired: false,
        details: action.payload.details
      };
    case 'setUserSessionExpired': {
      return {
        ...state,
        isAuth: false,
        sessionExpired: true,
        details: undefined
      };
    }
    case 'logoutUser': {
      return {
        ...state,
        isAuth: false,
        details: undefined
      };
    }
    case 'updateUserSessionExpired': {
      return {
        ...state,
        sessionExpired: action.payload.sessionExpired
      };
    }
    case 'updatePlayerOptionalMarketingConsents':
      if (!state.details) return state;

      const updatedPlayerConsents = {
        ...state.details.optionalConsentsData,
        ...action.payload
      };

      const updatedPlayerDetails = {
        ...state.details,
        optionalConsentsData: updatedPlayerConsents
      };

      return {
        ...state,
        details: updatedPlayerDetails
      };

    case 'changeUserLimits':
      if (!state.details) return state;

      return {
        ...state,
        details: {
          ...state.details,
          limitsSet: {
            ...state.details.limitsSet,
            ...action.payload.newLimits
          },
          limitsChangePendingRequests: {
            ...state.details.limitsChangePendingRequests,
            ...action.payload.newLimitsChangePendingRequests
          }
        }
      };

    case 'updateUserDynamicData':
      if (!state.details) return state;
      return {
        ...state,
        details: {
          ...state.details,
          dynamicData: {
            ...action.payload
          }
        }
      };

    default:
      return { ...state };
  }
};

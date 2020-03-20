import { apiPostData, apiGetData } from 'helpers/apiConnector';
import { AppStateShape } from 'interfaces/interfaces';
import {
  PlayerOptionalConsentsData,
  PlayerAccountData
} from 'interfaces/player/player';

class UserHelper {
  changeUserConsents(newConsents: PlayerOptionalConsentsData): Promise<any> {
    return apiPostData(
      '/player/account/change-optional-consents-data',
      newConsents
    );
  }

  changeUserPassword(
    currentPassword: string,
    newPassword: string
  ): Promise<any> {
    return apiPostData('/player/account/change-password', {
      currentPassword,
      newPassword
    });
  }

  getAccountData(): Promise<PlayerAccountData> {
    return apiGetData('player/account/get-account-data');
  }

  getServerTimeFromState(state: AppStateShape): Date {
    if (
      !state ||
      !state.user ||
      !state.user.details ||
      !state.user.details.dynamicData
    )
      return new Date();
    return new Date(state.user.details.dynamicData.currentServerTime);
  }

  getLastValidTimeFromState(state: AppStateShape): Date | null {
    if (!state || !state.user || !state.user.details) return null;

    return new Date(state.user.details.lastValidLogin);
  }

  getLastInvalidTimeFromState(state: AppStateShape): Date | null {
    if (
      !state ||
      !state.user ||
      !state.user.details ||
      !state.user.details.lastInvalidLogin
    )
      return null;

    return new Date(state.user.details.lastInvalidLogin);
  }

  isUserAccountConfirmed(state: AppStateShape): boolean {
    if (!state || !state.user || !state.user.details) return false;
    return state.user.details.accountStatus === 'CONFIRMED';
  }

  isUserAccountActive(state: AppStateShape): boolean {
    if (!state || !state.user || !state.user.details) return false;
    return state.user.details.accountStatus === 'ACTIVE';
  }

  isPoliticalClearToPlay(state: AppStateShape): boolean {
    if (
      !state ||
      !state.user ||
      !state.user.details ||
      !state.user.details.optionalConsentsData
    )
      return false;

    const politicalVipDeclaration =
      state.user.details.optionalConsentsData.politicalVipDeclaration;
    const politicalVipFormSend =
      state.user.details.optionalConsentsData.politicalVipFormSend;

    if (politicalVipDeclaration === true) {
      if (politicalVipFormSend === true) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  isUserFullAccess(state: AppStateShape): boolean {
    return (
      this.isPoliticalClearToPlay(state) && this.isUserAccountActive(state)
    );
  }
}

export const userHelper = new UserHelper();

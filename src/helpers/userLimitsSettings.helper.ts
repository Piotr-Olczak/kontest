import { toSeconds } from 'helpers/utils';
import { AppStateShape } from 'interfaces/interfaces';
import {
  PlayerBalanceLimitsShape,
  PlayerTimeLimitsShape,
  PlayerLimitsAllShape,
  PlayerLimitsChangePendingRequests,
  PlayerTimeLimitsFormShape
} from 'interfaces/player/player';
import { apiPostData, apiGetData } from 'helpers/apiConnector';

const ONE_MIN = 60;
const ONE_HOUR = 60 * ONE_MIN;
const MINIMAL_TIME_LIMIT_FOR_DAY = 5;
const MINIMAL_TIME_LIMIT_FOR_MONTH = 5;
const MINIMAL_BALANCE_LIMIT_FOR_DAY = 1; // in PLN
const MINIMAL_BALANCE_LIMIT_FOR_MONTH = 1; // in PLN

class UserLimitsSettingsHelper {
  mapTimeLimitsToForm(
    limitsFromState: PlayerTimeLimitsShape
  ): PlayerTimeLimitsFormShape {
    const splitTime = (time: number): { hours: number; minutes: number } => {
      const minutes = Math.floor(time / ONE_MIN);
      const hours = Math.floor(time / ONE_HOUR);

      return {
        hours: hours,
        minutes: minutes % 60
      };
    };

    const dailyLimits = splitTime(limitsFromState.timeLimit1d);
    const monthlyLimits = splitTime(limitsFromState.timeLimit1m);

    return {
      timeLimit1dHours: dailyLimits.hours,
      timeLimit1dMinutes: dailyLimits.minutes,
      timeLimit1mHours: monthlyLimits.hours,
      timeLimit1mMinutes: monthlyLimits.minutes
    };
  }

  mapFormTimeLimitsToApi(
    limitsFromForm: PlayerTimeLimitsFormShape
  ): PlayerTimeLimitsShape {
    return {
      timeLimit1m:
        toSeconds(limitsFromForm['timeLimit1mHours'], 'hours') +
        toSeconds(limitsFromForm['timeLimit1mMinutes'], 'minutes'),
      timeLimit1d:
        toSeconds(limitsFromForm['timeLimit1dHours'], 'hours') +
        toSeconds(limitsFromForm['timeLimit1dMinutes'], 'minutes')
    };
  }

  changePlayerLimits(
    timeLimits: PlayerTimeLimitsShape,
    balanceLimits: PlayerBalanceLimitsShape
  ): Promise<any> {
    return apiPostData('player/account/change-limits', {
      ...timeLimits,
      ...balanceLimits
    });
  }

  getInitialTimeLimitsFromState(state: AppStateShape): PlayerTimeLimitsShape {
    const initialData: PlayerTimeLimitsShape = {
      timeLimit1d: MINIMAL_TIME_LIMIT_FOR_DAY,
      timeLimit1m: MINIMAL_TIME_LIMIT_FOR_MONTH
    };
    const stateData = this.getTimeLimitsFromState(state);
    if (!stateData) return initialData;
    return stateData;
  }

  getTimeLimitsFromState(
    state: AppStateShape
  ): PlayerTimeLimitsShape | undefined {
    if (
      !state ||
      !state.user ||
      !state.user.details ||
      !state.user.details.limitsSet
    )
      return;

    return {
      timeLimit1m: state.user.details.limitsSet.timeLimit1m,
      timeLimit1d: state.user.details.limitsSet.timeLimit1d
    };
  }

  getInitialBalanceLimitsFromState(
    state: AppStateShape
  ): PlayerBalanceLimitsShape {
    const initialData: PlayerBalanceLimitsShape = {
      balanceLimit1m: MINIMAL_BALANCE_LIMIT_FOR_MONTH,
      balanceLimit1d: MINIMAL_BALANCE_LIMIT_FOR_DAY
    };
    const stateData = this.getBalanceLimitsFromState(state);
    if (!stateData) return initialData;
    return stateData;
  }

  getBalanceLimitsFromState(
    state: AppStateShape
  ): PlayerBalanceLimitsShape | undefined {
    if (
      !state ||
      !state.user ||
      !state.user.details ||
      !state.user.details.limitsSet
    )
      return;

    return {
      balanceLimit1d: state.user.details.limitsSet.balanceLimit1d,
      balanceLimit1m: state.user.details.limitsSet.balanceLimit1m
    };
  }

  getAccountBreakIntervalsFromState(state: AppStateShape): number[] {
    if (
      !state ||
      !state.systemSettings ||
      !state.systemSettings.accountBreakIntervals
    )
      return [];

    return state.systemSettings.accountBreakIntervals;
  }

  getSelfExclusionIntervalsFromState(state: AppStateShape): number[] {
    if (
      !state ||
      !state.systemSettings ||
      !state.systemSettings.selfExclusionsIntervals
    )
      return [];

    return state.systemSettings.selfExclusionsIntervals;
  }

  setSelfExclusion(selfExclusionInterval: number): Promise<any> {
    const queryParams = new URLSearchParams();
    queryParams.set('selfExcusionInterval', selfExclusionInterval.toString());
    const selfExclusionApiUrl: string = '/player/account/request-self-exlusion';
    const queryUrl: string = `${selfExclusionApiUrl}?${queryParams.toString()}`;
    return apiGetData(queryUrl);
  }

  getLimitChangePendingRequest(
    newLimitKey: keyof PlayerLimitsChangePendingRequests,
    playerLimits: PlayerLimitsAllShape
  ) {
    const newLimit =
      playerLimits.limitsChangePendingRequests &&
      playerLimits.limitsChangePendingRequests[newLimitKey]
        ? playerLimits.limitsChangePendingRequests[newLimitKey]
        : null;
    return newLimit;
  }
}

export const userLimitsSettingsHelper = new UserLimitsSettingsHelper();

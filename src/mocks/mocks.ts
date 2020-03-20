import { FaqElementShape } from 'interfaces/FaqElement/FaqElement';
import { PlayerLimits } from 'interfaces/player/player';
import { SingleBetCouponShape } from 'interfaces/SingleBetCoupon/SingleBetCoupon';

import miscSlips from 'mocks/slips/misc';
import gameStateMultiRaceDays from 'mocks/gameState/multiDayRaces';

const DELAY_TIME = 2000;
export const delay = <T = any>(
  value?: any,
  time: number = DELAY_TIME
): Promise<T> =>
  new Promise(res => {
    setTimeout(() => res(value), DELAY_TIME);
  });

export const mockPostSlip = (): Promise<any> => {
  return delay();
};

export const mockUserBets: SingleBetCouponShape[] = [
  {
    reserve: 1,
    multiplier: 2,
    combinations: 5,
    raceNumber: 2,
    raceDayLabel: 'SZZ',
    betTypeLabel: 'ZWC',
    notation: '1-2-3',
    baseStakePrice: 23,
    couponDate: new Date(),
    couponNumber: 23232323232321,
    isCancellationEnabled: true
  },
  {
    reserve: 1,
    multiplier: 2,
    combinations: 5,
    raceNumber: 2,
    raceDayLabel: 'SZZ',
    betTypeLabel: 'ZWC',
    notation: '1-2-3',
    baseStakePrice: 23,
    couponDate: new Date(),
    couponNumber: 23232323232322,
    isCancellationEnabled: true
  },
  {
    reserve: 1,
    multiplier: 2,
    combinations: 5,
    raceNumber: 2,
    raceDayLabel: 'SZZ',
    betTypeLabel: 'ZWC',
    notation: '1-2-3',
    baseStakePrice: 23,
    couponDate: new Date(),
    couponNumber: 23232323232323,
    isCancellationEnabled: false
  },
  {
    reserve: 1,
    multiplier: 2,
    combinations: 5,
    raceNumber: 2,
    raceDayLabel: 'SZZ',
    betTypeLabel: 'ZWC',
    notation: '1-2-3',
    baseStakePrice: 23,
    couponDate: new Date(),
    couponNumber: 23232323232324,
    isCancellationEnabled: false
  }
];

export const mockFetchUserBets: {
  (): Promise<{ single: SingleBetCouponShape[] }>;
} = () => {
  return delay({ single: mockUserBets });
};

export const mockUpdateUserConsents = () => {
  return delay(true);
};

export const MOCK_FAQ: FaqElementShape[] = [
  {
    id: 1,
    title: 'Dlaczego potwierdzamy Twoje konto w ten sposób?',
    description:
      'Zgodnie z polskim prawem w grach hazardowych mogą brać udział tylko osoby pełnoletnie. Naszym obowiązkiem jest zagwarantowanie, że grasz legalnie.'
  },
  {
    id: 2,
    title: 'Gdzie trafią zdjęcia mojego dowodu?',
    description:
      ' Zgodnie z polskim prawem w grach hazardowych mogą brać udział tylko osoby pełnoletnie.'
  }
];

export const mockUpdatePlayerLimits = (newLimits: PlayerLimits) => {
  return delay(newLimits);
};

export const mockApiCall = () => {
  return delay();
};

export const mockUserSlips = () =>
  delay({
    filterFields: {
      creationDateFrom: null,
      creationDateTo: null,
      ekonikSlipNumber: null,
      slipStatus: null,
      trackCode: null,
      raceDayDate: null,
      slipAmountMin: null,
      slipAmountMax: null,
      winAmountMin: null,
      winAmountMax: null,
      taxAmountMin: null,
      taxAmountMax: null,
      returnAmountMin: null,
      returnAmountMax: null,
      sortingField: null,
      sortingOrder: null
    },
    slipsList: miscSlips
  });

export const mockChangeLimits = () =>
  delay({
    limitsSet: {
      timeLimit1d: 86400,
      timeLimit1m: 2678400,
      balanceLimit1d: 80.0,
      balanceLimit1m: 12000.0
    },
    limitsChangePendingRequests: {
      newTimeLimit1dValue: 0,
      newTimeLimit1dDate: null,
      timeLimit1dChangesCounter: 0,
      newTimeLimit1mValue: 0,
      newTimeLimit1mDate: null,
      timeLimit1mChangesCounter: 0,
      newBalanceLimit1dValue: 90.0,
      newBalanceLimit1dDate: 1563613059339,
      balanceLimit1dChangesCounter: 1,
      newBalanceLimit1mValue: 12050,
      newBalanceLimit1mDate: 1563613059339,
      balanceLimit1mChangesCounter: 0
    }
  });

export const mockGameStateAllCases = () => delay(gameStateMultiRaceDays);

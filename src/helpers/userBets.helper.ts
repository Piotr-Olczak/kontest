import { apiPostData, apiGetData } from './apiConnector';
import { SlipStatus, SlipsFiltersShape } from 'interfaces/slip/slip';
import { RaceDayInfoShape } from 'contexts/singleBet.context';

export interface SlipDescriptionBetShape {
  betTypeShortName: string;
  combinations: string;
  substitute: string;
  quantity: number;
  combinationsNumber: number;
  baseStake: number;
}

export interface SlipDescriptionShape {
  ekonikSlipNumber?: string;
  slipStatus?: SlipStatus;
  raceDay: RaceDayInfoShape;
  racesDescription?: string;
  slipAmount?: number;
  winAmount?: number;
  tax?: number;
  taxRate?: number;
  returnAmount?: number;
  currencySymbol: string;
  bets: Array<SlipDescriptionBetShape>;
  creationTimestamp?: number;
  cancellationTimestamp?: number | null;
  paymentTimestamp?: null | null;

  raceNumber: number;
}

interface SlipsShape {
  filterFields: SlipsFiltersShape;
  slipsList: Array<SlipDescriptionShape>;
}

class UserBetsHelper {
  fetchUserBets(): Promise<SlipsShape> {
    return apiPostData('/player/gambling/get-slips', {});
  }

  cancelUserBet(betNumber: number) {
    return apiGetData(
      `/player/gambling/cancel-slip?ekonikSerialNumber=${betNumber}`
    );
  }
}

export const userBetsHelper = new UserBetsHelper();

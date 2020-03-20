import { BetTypeMetaData } from 'interfaces/bet/bet';
import {
  FinancialOperationsFilterSortingField,
  FinancialOperationStatus,
  FinancialOperationType
} from 'interfaces/financialOperations/financialOperations';
import {
  PlayerAccountData,
  PlayerAccountLockCause,
  PlayerAccountStatus,
  PlayerLimits
} from 'interfaces/player/player';
import {
  RaceStatus
} from 'interfaces/race/race';
import { SlipsFilterSortingField, SlipStatus } from 'interfaces/slip/slip';

export interface UserShape {
  isAuth: boolean;
  sessionExpired: boolean;
  details?: PlayerAccountData;
}

export interface ActionShape {
  type: string;
  payload?: any;
}

export interface AppContextShape {
  state: AppStateShape;
  dispatch: (action: ActionShape) => void;
}

export interface SystemSettingsShape extends PasswordSettingsShape {
  accountBreakIntervals?: Array<number>;
  betTypeMetaDataList?: Array<BetTypeMetaData>;
  defaultPlayerLimits?: PlayerLimits;
  financialOperationsFilterSortingFields?: Array<
    FinancialOperationsFilterSortingField
  >;
  financialOperationStatuses?: Array<FinancialOperationStatus>;
  financialOperationTypes?: Array<FinancialOperationType>;
  maxPlayerLimits?: PlayerLimits;
  maxSlipAmount?: number;
  minPlayerLimits?: PlayerLimits;
  playerAccountLockCauses?: Array<PlayerAccountLockCause>;
  playerAccountStatuses?: Array<PlayerAccountStatus>;
  playerInactivityLogoutTimeout?: number;
  raceStatuses?: Array<RaceStatus>;
  raisePlayerLimitsIntervals?: number;
  selfExclusionsIntervals?: Array<number>;
  slipsFilterSortingFields?: Array<SlipsFilterSortingField>;
  slipStatuses?: Array<SlipStatus>;
  sortingOrders?: string;
  tracksList?: string;
  tracksMap?: Array<object>;
  raceTypesMap?: Array<object>;
}

export interface PasswordSettingsShape {
  passwordMinLength?: number;
  passwordMinNumberOfDigits?: number;
  passwordMinNumberOfLowerCaseCharacters?: number;
  passwordMinNumberOfSpecialCharacters?: number;
  passwordMinNumberOfUpperCaseCharacters?: number;
}

export interface AppSettingsShape {
  appBasePath?: string;
}
export interface AppStateShape {
  appSettings: AppSettingsShape;
  systemSettings: SystemSettingsShape;
  user: UserShape;
  statuses: Array<statusShape>;
}

//Status Handler

export interface statusShape {
  from: string;
  status: string;
  id: string;
}

export interface statusesShape extends Array<statusShape> { }
interface StatusVocabularyItemShape {
  [key: string]: {
    text: string;
    type: string;
  };
}
export interface StatusVocabularyShape {
  [key: string]: StatusVocabularyItemShape;
}

export interface StatusTypesTypeShape {
  className: string;
  timer: number;
}
export interface StatusTypesShape {
  [key: string]: StatusTypesTypeShape;
}

// Form Group

export interface RequestObject {
  url: string;
  method: string;
  headers?: object;
  data?: object;
}

export type SortingOrderShape = 'ASC' | 'DESC';

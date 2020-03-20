export type PlayerAccountLockCause = 'FRAUD_SUSPICION' | 'OTHER';
export type PlayerAccountStatus =
  | 'ACTIVE'
  | 'ACTIVE_INVALID_LOGIN_LOCK'
  | 'ACTIVE_NO_POLITICAL_VIP_FORM'
  | 'CONFIRMED'
  | 'CLOSED'
  | 'CLOSING'
  | 'CONFIRMED'
  | 'CREATED'
  | 'LOCKED'
  | 'SELF_EXCLUDED';

export type PlayerFundsSource =
  | 'COMPANY'
  | 'CONTRACT'
  | 'EMPLOYMENT'
  | 'FALL_OR_DONATION'
  | 'FREELANCE'
  | 'RENT'
  | 'WIN_OR_PRIZE'
  | string;

export interface PlayerBasicData {
  bankAccountNumber: string;
  city: string;
  country: string;
  dateOfBirth: string;
  email: string;
  firstName: string;
  flatNr: string;
  houseNr: string;
  idDocumentNumber: string;
  lastName: string;
  nationality: string;
  pesel: string;
  phoneNumber: string;
  postalCode: string;
  street: string;
}

export interface PlayerDynamicData {
  currentBalance: number;
  currentServerTime: number;
  currentSessionDuration: number;
  limitsLeft: PlayerLimits;
}

export interface PlayerLimitsChangePendingRequests {
  balanceLimit1dChangesCounter: number;
  balanceLimit1mChangesCounter: number;
  newBalanceLimit1dDate: number;
  newBalanceLimit1dValue: number;
  newBalanceLimit1mDate: number;
  newBalanceLimit1mValue: number;
  newTimeLimit1dDate: number;
  newTimeLimit1dValue: number;
  newTimeLimit1mDate: number;
  newTimeLimit1mValue: number;
  timeLimit1dChangesCounter: number;
  timeLimit1mChangesCounter: number;
}

export interface PlayerLimits
  extends PlayerBalanceLimitsShape,
    PlayerTimeLimitsShape {}

export interface PlayerBalanceLimitsShape {
  balanceLimit1d: number;
  balanceLimit1m: number;
}

export interface PlayerTimeLimitsShape {
  timeLimit1d: number;
  timeLimit1m: number;
}

export interface PlayerLimitsAllShape {
  minPlayerLimits?: PlayerLimits;
  maxPlayerLimits?: PlayerLimits;
  currentLimits?: PlayerLimits;
  limitsChangePendingRequests?: PlayerLimitsChangePendingRequests;
}

export interface PlayerLimitsFormShape
  extends PlayerBalanceLimitsShape,
    PlayerTimeLimitsFormShape {}

export interface PlayerBalanceLimitsFormShape {
  balanceLimit1d: number;
  balanceLimit1m: number;
}

export interface PlayerTimeLimitsFormShape {
  timeLimit1dHours: number;
  timeLimit1dMinutes: number;
  timeLimit1mHours: number;
  timeLimit1mMinutes: number;
}

export interface PlayerOptionalConsentsData
  extends PlayerOptionalMarketingConsents {
  fundsSource: PlayerFundsSource | '';
  politicalVipDeclaration: boolean;
  politicalVipFormSend?: boolean;
  privateBankingDeclaration: boolean;
  ownerFundsDeclaration: boolean;
}

export interface PlayerOptionalMarketingConsents {
  mailMarketingConsent: boolean;
  phoneMarketingConsent: boolean;
  smsMarketingConsent: boolean;
}

export interface PlayerRequiredConsentsData {
  cookiesConsent: boolean;
  hracingRegulationsConsent: boolean;
  maturityConsent: boolean;
  rodoConsent: boolean;
}

export interface PlayerAccountData {
  accountLockCause: PlayerAccountLockCause;
  accountStatus: PlayerAccountStatus;
  basicData: PlayerBasicData;
  dynamicData: PlayerDynamicData;
  lastInvalidLogin: string;
  lastValidLogin: string;
  limitsChangePendingRequests: PlayerLimitsChangePendingRequests;
  limitsSet: PlayerLimits;
  optionalConsentsData: PlayerOptionalConsentsData;
  pcode: string;
  playerId: string;
  requiredConsentsData: PlayerRequiredConsentsData;
  temporaryPassword: boolean;
}

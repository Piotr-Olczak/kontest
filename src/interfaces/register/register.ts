import {
  PlayerBasicData,
  PlayerLimits,
  PlayerOptionalConsentsData,
  PlayerRequiredConsentsData
} from 'interfaces/player/player';

import { PlayerFundsSource } from 'interfaces/player/player';

export interface RegisterStepsShape {
  currentStep: number;
}

export interface RegisterHeaderShape {
  currentStep: number;
}

export interface RegisterFormInitialValuesShape {
  cookiesConsent: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  pesel: string;
  idDocumentNumber: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  street: string;
  houseNr: string;
  flatNr?: string;
  city: string;
  postalCode: string;
  country: string;
  nationality: string;
  bankAccountNumber: string;
  fundsSource: PlayerFundsSource | string;
  ownerFundsDeclaration: boolean;
  hracingRegulationsConsent: boolean;
  maturityConsent: boolean;
  mailMarketingConsent: boolean;
  smsMarketingConsent: boolean;
  phoneMarketingConsent: boolean;
  balanceLimit1d: number;
  balanceLimit1m: number;
  timeLimit1dHours: number;
  timeLimit1dMinutes: number;
  timeLimit1mHours: number;
  timeLimit1mMinutes: number;
  privateBankingDeclaration: boolean;
  politicalVipDeclaration: boolean;
  rodoConsent: boolean;
}

export interface RegisterFormShape {
  currentStep: number;
  initialValues: RegisterFormInitialValuesShape;
  changeStep(value: any): void;
}

export interface PlayerCreationData {
  basicData: PlayerBasicData;
  limitsToSet: PlayerLimits;
  optionalConsentsData: PlayerOptionalConsentsData;
  password: string;
  requiredConsentsData: PlayerRequiredConsentsData;
}

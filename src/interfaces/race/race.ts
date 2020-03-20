export type RaceStatus =
  | 'ACTIVE'
  | 'CANCELLED'
  | 'RESULT_CONFIRMED'
  | 'STARTED'
  | 'UNDER_CONSTRUCTION';

export interface RaceTypesMaps {
  apiCode: string;
  baseBetTypeApiCode: string;
  boxAllowed: boolean;
  isActive: boolean;
  minHorsesStartedNumber: number;
  minValidRacesNumber: number;
  orderMatters: boolean;
  racesNumber: number;
  selectionsNumber: number;
  shortName: string;
  substituteAllowed: boolean;
}

export interface RaceTypesMaps {
}

export interface TracksMaps {
}
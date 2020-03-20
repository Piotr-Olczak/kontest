import { SortingOrderShape } from 'interfaces/interfaces';

export type SlipsFilterSortingField =
  | 'CREATION_TIMESTAMP'
  | 'EKONIK_SLIP_NUMBER'
  | 'RETURN_AMOUNT'
  | 'SLIP_AMOUNT'
  | 'SLIP_STATUS'
  | 'TAX_AMOUNT'
  | 'TRACK_CODE'
  | 'WIN_AMOUNT';

export type SlipStatus = 'CANCELLED' | 'CREATED' | 'PAYED';

export interface SlipsFiltersShape {
  creationDateFrom: number | null;
  creationDateTo: number | null;
  ekonikSlipNumber: string | null;
  raceDayDate: number | null;
  returnAmountMax: number | null;
  returnAmountMin: number | null;
  slipAmountMax: number | null;
  slipAmountMin: number | null;
  slipStatus: SlipStatus;
  sortingField: SlipsFilterSortingField;
  sortingOrder: SortingOrderShape | null;
  taxAmountMax: number | null;
  taxAmountMin: number | null;
  trackCode: string | null;
  winAmountMax: number | null;
  winAmountMin: number | null;
}

export interface SlipRaceBetShape {
  trackCode: string;
  raceDate: string;
  raceNumber: string;
}

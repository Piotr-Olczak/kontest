export interface SingleBetCouponShape {
  couponNumber?: number;
  couponDate?: Date;
  combinations: number;
  raceNumber: number;
  raceDayLabel: string;
  baseStakePrice: number;
  betTypeLabel: string;
  notation: string;
  multiplier: number;
  reserve?: number;
  isCancellationEnabled?: boolean;
}

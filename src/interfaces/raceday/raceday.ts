export interface HorsesShape {
  [key: number]: HorseShape;
}
interface HorseShape {
  [key: number]: boolean | null;
}
export interface WallShape {
  [key: number]: Object;
}
export interface BoxShape {
  [key: number]: Object;
}

export interface RaceBetTypeSettingsShape {
  rowsToBet: number;
  minHorsesToBet: number;
  substituteAllowed: boolean;
  boxAllowed: boolean;
}

export interface SubstitutionsShape {
  [key: number]: SubstitutionShape;
}
export interface SubstitutionShape {
  [key: number]: boolean | null;
}

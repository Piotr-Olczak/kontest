export interface RaceDayShape {
  trackCode: string;
  raceDate: number;
  eventsPlace: string;
}
export class GameStateShape {
  activeRaceDays: Array<GameStateRaceDayShape> = [];
  timestamp: number = 0;
}

export interface GameStateMultiRaceBetTypeRace {
  baseBetTypeApiCode: string;
  orderInBetDefinition: number;
  raceNumber: number;
  raceDay: RaceDayShape;
}
export interface GameStateMultiRaceBetTypeShape {
  active: boolean;
  baseStake: number;
  betRaces: Array<GameStateMultiRaceBetTypeRace>;
  betTypeApiCode: string;
  betTypeButtonLabel: string;
  isMultiRaceMultiDayBetType: boolean;
  uniqueId: string;
  eventsPlace: string;
}
export interface GameStateRaceDayShape {
  raceDay: RaceDayShape;
  raceDayNumber: number;
  raceDayButtonLabel: string;
  buttonBackgroundColor: null | string;
  buttonForegroundColor: null | string;
  races: Array<GameStateRaceShape>;
  multiRaceBetTypes: Array<GameStateMultiRaceBetTypeShape>;
  uniqueId: string;
  eventsPlace: string;
}
export interface GameStateRaceShape {
  raceNumber: number;
  raceStatus: GameStateRaceStatusType;
  horsesNumber: number;
  raceButtonLabel: string;
  startDate: number;
  activeHorseNumbers: Array<number>;
  singleRaceBetTypes: Array<SingleRaceBetTypeShape>;
  uniqueId: string;
  longDescription: string;
}

export type GameStateRaceStatusType = 'ACTIVE' | 'STARTED';

export class SingleRaceBetTypeShape {
  betTypeApiCode: string = '';
  baseStake: number = 0;
  active: boolean = false;
  betTypeButtonLabel: string = '';
  activeBetBoxAllowed: boolean = false;
}

export class MultiRaceBetTypeShape {
  betTypeApiCode: string = '';
  baseStake: number = 0;
  active: boolean = false;
  betTypeButtonLabel: string = '';
  activeBetBoxAllowed: boolean = false;
}
export interface RaceDaysShape {
  days: Array<GameStateRaceDayShape>;
  handleRaceDay: SetRaceDayShape;
}
export interface RaceDayPropsShape {
  day: GameStateRaceDayShape | undefined;
}
export interface SetRaceDayShape {
  (item?: number): void;
}

export interface betTypeDictionaryShape {
  [key: string]: string;
}

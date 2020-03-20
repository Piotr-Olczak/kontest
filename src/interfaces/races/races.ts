import { GameStateRaceShape } from 'interfaces/racedays/racedays';

export interface RacesPropsShape {
  races: Array<GameStateRaceShape>;
  race: GameStateRaceShape | undefined;
  handleRace: { (index: GameStateRaceShape): void };
}

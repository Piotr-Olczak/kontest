import { SingleRaceBetTypeShape } from 'interfaces/racedays/racedays';

export interface BetsPropsShape {
  betTypeApiCode: string;
  singleRaceBetTypes: Array<SingleRaceBetTypeShape>;
  handleSingleRaceBetType: { (bet: SingleRaceBetTypeShape): void };
}

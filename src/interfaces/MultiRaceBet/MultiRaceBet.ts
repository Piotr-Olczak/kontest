import { HorseSelectionShape } from 'interfaces/HorseSelection/HorseSelectionShape';
import { UnusedHorsesShape } from 'contexts/singleBet.context';

export interface BetRaceDataShape {
  horsesSelected: HorseSelectionShape[];
  unusedHorses: UnusedHorsesShape;
  combinations: Array<Array<number>>;
  reserve: number;
}

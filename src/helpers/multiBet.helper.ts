import { DateHelper } from './date.helper';
import {
  GameStateMultiRaceBetTypeRace,
  GameStateMultiRaceBetTypeShape
} from 'interfaces/racedays/racedays';
import { BetRaceDataShape } from 'interfaces/MultiRaceBet/MultiRaceBet';
import {
  singleBetHelper,
  SlipShape,
  SingleRaceBetEnhancedShape,
  prepareSelections
} from './singleBet.helper';

class MultiBetHelper {
  getMultiBetRaceDescription = (
    multiBetRaceBets: GameStateMultiRaceBetTypeRace[],
    isMultiRaceMultiDayBetType: boolean
  ): string => {
    const raceDescriptions: string[] = [];
    multiBetRaceBets.map((race: GameStateMultiRaceBetTypeRace) => {
      const raceNumber = race.raceNumber;
      const trackCode = race.raceDay.trackCode;
      const raceDate = DateHelper.formatDateFriendly(
        new Date(race.raceDay.raceDate)
      );
      const singleRaceDescription =
        isMultiRaceMultiDayBetType === true
          ? `${trackCode} ${raceDate} ${raceNumber}`
          : `${raceNumber}`;
      return raceDescriptions.push(singleRaceDescription);
    });

    const raceDescription =
      isMultiRaceMultiDayBetType === true
        ? raceDescriptions.join('|')
        : raceDescriptions.join(', ');
    return raceDescription;
  };

  getMultiBetReserve = (bets: BetRaceDataShape[]): string => {
    const reserves: string[] = bets.map((bet: BetRaceDataShape) =>
      bet.reserve === 0 ? 'X' : bet.reserve.toString()
    );
    return reserves.join('|');
  };

  getMultiBetCombinationsNotation = (bets: BetRaceDataShape[]): string => {
    const combinationsNotation: string[] = bets.map((bet: BetRaceDataShape) =>
      singleBetHelper.printNotationFromSelection(bet.horsesSelected)
    );
    return combinationsNotation.join('|');
  };

  countTotalNumberOfCombinations = (bets: BetRaceDataShape[]): number =>
    bets.reduce(
      (numOfCombinations, bet) => numOfCombinations * bet.combinations.length,
      1
    );

  prepareSingleRaceBets = (
    bets: BetRaceDataShape[],
    multiBetType: GameStateMultiRaceBetTypeShape
  ): SingleRaceBetEnhancedShape[] => {
    return bets.map((bet: BetRaceDataShape, index: number) => {
      const preparedSelections = prepareSelections(bet.horsesSelected);

      const { selections, boxSelection } = preparedSelections;

      return {
        betTypeApiCode: multiBetType.betRaces[index].baseBetTypeApiCode,
        combinationsNumber: bet.combinations.length,
        quantity: 1,
        betRace: {
          raceDay: multiBetType.betRaces[index].raceDay,
          raceNumber: multiBetType.betRaces[index].raceNumber
        },
        selections,
        substituteHorseNumber: bet.reserve ? bet.reserve : null,
        boxSelection
      };
    });
  };

  prepareSlip = (
    bets: BetRaceDataShape[],
    amount: number,
    numOfCombinations: number,
    multiplier: number,
    multiBetType: GameStateMultiRaceBetTypeShape
  ): SlipShape => {
    const singleRaceBets = this.prepareSingleRaceBets(bets, multiBetType);

    return {
      amount,
      bets: [
        {
          betTypeApiCode: multiBetType.betTypeApiCode,
          combinationsNumber: numOfCombinations,
          quantity: multiplier,
          singleRaceBets: singleRaceBets
        }
      ]
    };
  };
}

export const multiBetHelper = new MultiBetHelper();

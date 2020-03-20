import { permutator } from 'helpers/permutator';
import { HorseSelectionShape } from 'interfaces/HorseSelection/HorseSelectionShape';
import { apiPostData } from 'helpers/apiConnector';
import {
  SingleBetStateShape,
  RaceDayInfoShape
} from 'contexts/singleBet.context';
import { convertToCentums } from './currency.helper';
import { SlipDescriptionShape } from './userBets.helper';

const WALL_SIGN = '*';
const BOX_SIGN = '#';
const HORSES_SEPARATOR = '-';
const PLACES_SEPARATOR = '/';

const PDK_BET_TYPE_API_CODE = '2';

/**
 * Calculates bet amout based on factors
 */
export const countAmount = (
  baseStakePrice: number,
  combinations: number,
  multiplier: number
): number =>
  (convertToCentums(baseStakePrice) *
    convertToCentums(combinations) *
    convertToCentums(multiplier)) /
  1000000;

interface BetShape {
  betTypeApiCode: string;
  combinationsNumber: number;
  quantity: number;
}

interface SingleRaceBetShape {
  betRace: {
    raceDay: RaceDayInfoShape;
    raceNumber: number;
  };
  boxSelection: SlipSelectionShape | null;
  selections: Array<SlipSelectionShape> | null;
  substituteHorseNumber: number | null;
}

export interface SingleRaceBetEnhancedShape
  extends SingleRaceBetShape,
  BetShape { }

interface MultiRaceBetShape {
  singleRaceBets: Array<SingleRaceBetEnhancedShape>;
}

interface MultiRaceBetEnhancedShape extends MultiRaceBetShape, BetShape { }

export interface SlipShape {
  bets: Array<SingleRaceBetEnhancedShape | MultiRaceBetEnhancedShape>;
  amount: number;
}
interface SelectionShape {
  selectedHorses: Array<number>;
  isWallOn: boolean;
  isBoxOn: boolean;
}

export interface SlipSelectionShape {
  horseNumbers: Array<number> | null;
  wall: boolean;
}

interface preparedSelectionsShape {
  selections: Array<SlipSelectionShape> | null;
  boxSelection: SlipSelectionShape | null;
}

const transformSelection = (item: SelectionShape): SlipSelectionShape => {
  const horseNumbers = item.selectedHorses.length ? item.selectedHorses : null;
  const wall = item.isWallOn;

  return { horseNumbers, wall };
};

export const prepareSelections = (
  inputSelections: Array<SelectionShape>
): preparedSelectionsShape => {
  const rowInBoxIndex: number = inputSelections.findIndex(
    (selection: SelectionShape) => selection.isBoxOn
  );

  const selectionsToMap: Array<SelectionShape> =
    rowInBoxIndex > -1
      ? inputSelections.slice(0, rowInBoxIndex)
      : inputSelections;

  const selections: Array<SlipSelectionShape> = selectionsToMap.map(
    transformSelection
  );

  const boxSelection: SlipSelectionShape | null =
    rowInBoxIndex > -1
      ? transformSelection(inputSelections[rowInBoxIndex])
      : null;

  return {
    selections: rowInBoxIndex === 0 ? null : selections,
    boxSelection
  };
};

class SingleBetHelper {
  prepareSlip = (
    slipCoupon: SlipDescriptionShape,
    singleBetState: SingleBetStateShape
  ): SlipShape | null => {
    const firstBet = slipCoupon.bets[0];

    const amount = countAmount(
      firstBet.baseStake,
      firstBet.combinationsNumber,
      firstBet.quantity
    );

    if (!singleBetState.raceDayInfo) {
      return null;
    }

    const trackCode = singleBetState.raceDayInfo.trackCode;
    const raceDate = singleBetState.raceDayInfo.raceDate;
    const eventsPlace = singleBetState.raceDayInfo.eventsPlace;

    const substituteHorseNumber =
      singleBetState && singleBetState.reserve === 0
        ? null
        : singleBetState.reserve;

    const preparedSelections: preparedSelectionsShape = prepareSelections(
      singleBetState.horsesSelected
    );

    const { selections, boxSelection } = preparedSelections;

    return {
      bets: [
        {
          betTypeApiCode: singleBetState.activeBetType.betTypeApiCode,
          quantity: firstBet.quantity,
          combinationsNumber: firstBet.combinationsNumber,
          betRace: {
            raceDay: {
              trackCode,
              raceDate,
              eventsPlace
            },
            raceNumber: slipCoupon.raceNumber
          },
          selections,
          boxSelection,
          substituteHorseNumber: substituteHorseNumber || null
        }
      ],
      amount
    };
  };

  placeSlip(slip: SlipShape): Promise<any> {
    return apiPostData('/player/gambling/create-slip', slip);
  }

  private mapSelectionToArrays(
    horseSelections: HorseSelectionShape[],
    allRacingHorses: number[]
  ): number[][] {
    // transforms boxes and walls to array of selected horses
    // ex. DWJ [{ wall: true }, { selection: 1,3,5 }] --> [[1,2,3,4,5],[1,3,5]]
    // ex TRJ [{ selection: 1,3 }, { selection: 4,7, box: true}] --> [[1,3], [4,7], [4,7]]
    let boxValue: number[] = [];
    return horseSelections.map((selection: HorseSelectionShape) => {
      const isBelowSelectedBox = boxValue.length;
      const hasBoxSelected = selection.isBoxOn;
      const hasWallSelected = selection.isWallOn;

      if (isBelowSelectedBox) return boxValue;
      if (hasBoxSelected) {
        boxValue = hasWallSelected ? allRacingHorses : selection.selectedHorses;
        return boxValue;
      }
      if (hasWallSelected) return allRacingHorses;
      return selection.selectedHorses;
    });
  }

  countCombinationsFromSelection(
    horseSelection: HorseSelectionShape[],
    allRacingHorses: number[],
    apiCode: string
  ): Array<Array<number>> {
    const selectedHorses = this.mapSelectionToArrays(
      horseSelection,
      allRacingHorses
    );
    if (apiCode === PDK_BET_TYPE_API_CODE) {
      return permutator(selectedHorses, true);
    } else {
      return permutator(selectedHorses, false);
    }
  }

  printNotationFromSelection(horseSelection: HorseSelectionShape[]): string {
    // apart #, blocks are separated by "/"
    // selected horses are connected by "-"
    // if wall is on, replace horses by "*"
    // Notation examples
    // for [[1,2,3], [*]] => 1-2-3/*
    // for [#[1, 2, 3], [4,5,6]] => #1-2-3
    // for [[3,4], #[6,7], [1]] => 3-4#6-7
    // all other blocks after "#" are ignored

    let isAfterBox = false;
    return horseSelection
      .map((selection: HorseSelectionShape, index: number) => {
        if (isAfterBox) return '';
        if (selection.isBoxOn) {
          isAfterBox = true;
        }

        const notationSeparator = this.getNotationSeparatorForSelection(
          selection,
          index
        );
        const notationBody = this.getNotationBodyFromSelection(selection);

        return notationSeparator + notationBody;
      })
      .join('');
  }

  private getNotationBodyFromSelection(selection: HorseSelectionShape): string {
    const { isWallOn, selectedHorses } = selection;
    if (isWallOn) return WALL_SIGN;
    return selectedHorses.join(HORSES_SEPARATOR);
  }

  private getNotationSeparatorForSelection(
    selection: HorseSelectionShape,
    index: number
  ): string {
    const isFirstElement = index === 0;
    if (selection.isBoxOn) return BOX_SIGN;
    return isFirstElement ? '' : PLACES_SEPARATOR;
  }
}

export const singleBetHelper = new SingleBetHelper();

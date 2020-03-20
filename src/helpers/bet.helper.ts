import { AppStateShape } from 'interfaces/interfaces';
import { betTypeDictionaryShape } from 'interfaces/racedays/racedays';
import { HorseSelectionShape } from 'interfaces/HorseSelection/HorseSelectionShape';
import { UnusedHorsesShape } from 'contexts/singleBet.context';

class BetHelper {
  buildBetTypesDictionary(state: AppStateShape): betTypeDictionaryShape {
    const betTypesDictionary: betTypeDictionaryShape = {};

    state.systemSettings.betTypeMetaDataList &&
      state.systemSettings.betTypeMetaDataList.map(
        betTypeMetadata =>
          (betTypesDictionary[betTypeMetadata.apiCode] =
            betTypeMetadata.shortName)
      );
    return betTypesDictionary;
  }

  checkCombinationsForUnusedHorses(
    validCombinations: Array<Array<number>>,
    horse: number,
    index: number
  ) {
    let isUnused;
    for (let combination in validCombinations) {
      isUnused = true;
      if (validCombinations[combination][index] === horse) {
        isUnused = false;
        return isUnused;
      }
    }
    return isUnused;
  }

  prepareHorsesUnused(
    validCombinations: Array<Array<number>>,
    horsesSelected: Array<HorseSelectionShape>
  ): UnusedHorsesShape {
    const unusedAllHorses = horsesSelected.map(
      (item: HorseSelectionShape, index: number) => {
        const unusedHorses = item.selectedHorses.filter((horse: number) => {
          const isUnused = this.checkCombinationsForUnusedHorses(
            validCombinations,
            horse,
            index
          );
          return isUnused;
        });
        return unusedHorses.length ? unusedHorses : [];
      }
    );
    return unusedAllHorses;
  }
}

export const betHelper = new BetHelper();

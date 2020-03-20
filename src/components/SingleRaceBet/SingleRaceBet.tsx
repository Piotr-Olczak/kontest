import { AppContext } from 'components/AppState/AppState';
import { HorseReserveRow } from 'components/HorseReserveRow/HorseReserveRow';
import { MultipliersRow } from 'components/MultipliersRow/MultipliersRow';
import { BetTypeList } from 'components/SingleRaceBet/BetTypeList/BetTypeList';
import { SingleBetHorseSelection } from 'components/SingleRaceBet/SingleBetHorsesSelection/SingleBetHorsesSelection';
import { SingleBetContext, RaceDayInfoShape } from 'contexts/singleBet.context';
import { gameStateHelper } from 'helpers/gameState.helper';
import { systemSettingsHelper } from 'helpers/systemSettings.helper';
import { generateArray } from 'helpers/utils';
import { HorseSelectionShape } from 'interfaces/HorseSelection/HorseSelectionShape';
import { AppContextShape } from 'interfaces/interfaces';
import {
  GameStateRaceShape,
  SingleRaceBetTypeShape
} from 'interfaces/racedays/racedays';
import React, { useContext, useEffect, useState } from 'react';
import { supportedBetTypesByApiCode } from 'helpers/apiBetTypeCodesHelper';
import { UnusedHorsesWarning } from 'components/UnusedHorsesWarning/UnusedHorsesWarning';

interface SingleRaceBetShape {
  race: GameStateRaceShape;
  dayName: string;
  raceDayInfo: RaceDayInfoShape;
}

const SingleRaceBet: React.FC<SingleRaceBetShape> = props => {
  const { race, raceDayInfo } = props;
  const { state } = useContext<AppContextShape>(AppContext);
  const { singleBetState, setSingleBetState } = useContext(SingleBetContext);

  const {
    horsesSelected,
    activeBetType,
    multiplier,
    reserve,
    unusedHorses
  } = singleBetState;

  const [isReserveAllowed, setIsReserveAllowed] = useState(false);
  const [isBoxAllowed, setIsBoxAllowed] = useState();
  const handleTypeChange = (selectedBetType: SingleRaceBetTypeShape) => {
    const settings = systemSettingsHelper.getSettingsForBetType(
      state.systemSettings,
      selectedBetType.betTypeApiCode
    );
    if (!settings) return;

    const resetedSelection = generateArray<HorseSelectionShape>(
      settings.rowsToBet,
      new HorseSelectionShape()
    );

    setIsReserveAllowed(settings.substituteAllowed);

    setIsBoxAllowed(settings.boxAllowed);

    setSingleBetState({
      ...singleBetState,
      activeBetType: selectedBetType,
      activeBetBoxAllowed: isBoxAllowed,
      horsesSelected: resetedSelection,
      multiplier: 1,
      raceDayInfo: raceDayInfo,
      reserve: 0,
      unusedHorses: undefined
    });
  };

  const betTypes = gameStateHelper
    .getActiveBetTypes(race)
    .filter(betType =>
      supportedBetTypesByApiCode.includes(betType.betTypeApiCode)
    );

  useEffect(() => {
    // select first type as default
    handleTypeChange(betTypes[0]);
    /* eslint react-hooks/exhaustive-deps: 0 */
  }, []);

  const handleSelectionChange = (newSelection: HorseSelectionShape[]) => {
    setSingleBetState({
      ...singleBetState,
      horsesSelected: newSelection
    });
  };

  const handleMultiplierChange = (newMultiplier: number) => {
    setSingleBetState({
      ...singleBetState,
      multiplier: newMultiplier
    });
  };

  const handleReserveChange = (newReserveHorse: number) => {
    setSingleBetState({
      ...singleBetState,
      reserve: newReserveHorse
    });
  };

  return (
    <article className={'bet-content'}>
      <section className={'bet-content__body'}>
        <BetTypeList
          activeBetApiCode={activeBetType.betTypeApiCode}
          betTypes={betTypes}
          onTypeChange={handleTypeChange}
        />

        <UnusedHorsesWarning unusedHorses={unusedHorses} />

        <SingleBetHorseSelection
          race={race}
          rowsSelection={horsesSelected}
          onSelectionChange={handleSelectionChange}
          activeBetBoxAllowed={isBoxAllowed}
          unusedHorses={unusedHorses}
        />
        {isReserveAllowed && (
          <HorseReserveRow
            reserveHorses={race.activeHorseNumbers}
            onReserveChange={handleReserveChange}
            activeReserve={reserve}
          />
        )}
        <MultipliersRow
          activeMultiplier={multiplier}
          onMultiplierChange={handleMultiplierChange}
        />
      </section>
    </article>
  );
};

export default React.memo(
  SingleRaceBet,
  (prevProps: SingleRaceBetShape, nextProps: SingleRaceBetShape) => {
    const isDayNameEqual = prevProps.dayName === nextProps.dayName;
    const isRaceEqual = prevProps.race.raceNumber === nextProps.race.raceNumber;
    return isDayNameEqual && isRaceEqual;
  }
);

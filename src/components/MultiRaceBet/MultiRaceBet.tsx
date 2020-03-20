import React from 'react';
import { Tabs, Tooltip } from 'antd';

import {
  GameStateRaceShape,
  GameStateRaceDayShape,
  GameStateMultiRaceBetTypeShape
} from 'interfaces/racedays/racedays';

import { BetRaceDataShape } from 'interfaces/MultiRaceBet/MultiRaceBet';
import { MultipliersRow } from 'components/MultipliersRow/MultipliersRow';
import { SingleBetHorseSelection } from 'components/SingleRaceBet/SingleBetHorsesSelection/SingleBetHorsesSelection';
import { HorseSelectionShape } from 'interfaces/HorseSelection/HorseSelectionShape';
import { singleBetHelper } from 'helpers/singleBet.helper';
import { disabledUnusedHorsesApiCodes } from 'helpers/apiBetTypeCodesHelper';
import { betHelper } from 'helpers/bet.helper';
import { HorseReserveRow } from 'components/HorseReserveRow/HorseReserveRow';
import { RaceBetTypeSettingsShape } from 'interfaces/raceday/raceday';
import { DateHelper } from 'helpers/date.helper';
import classNames from 'classnames';
import { UnusedHorsesWarning } from 'components/UnusedHorsesWarning/UnusedHorsesWarning';

interface MultiRaceBetShape {
  races: GameStateRaceShape[];
  raceDay: GameStateRaceDayShape | undefined;
  multiBetSettings: RaceBetTypeSettingsShape;
  multiBetType: GameStateMultiRaceBetTypeShape;

  multiplier: number;
  setMultiplier: Function;

  betRacesData: Array<BetRaceDataShape>;
  setBetRacesData: Function;

  setCurrentActiveRace: Function;
}

const { TabPane } = Tabs;

const MultiRaceBetTab: React.FC<{
  trackName: string;
  raceNumber: number;
  date: string;
  hasCombinations: boolean;
  hasUnusedHorses: boolean;
}> = props => {
  const { trackName, raceNumber, date } = props;

  const raceError = !props.hasCombinations || props.hasUnusedHorses;

  const classes = classNames({
    'multi-race-bet-tab': true,
    'multi-race-bet-tab--invalid': raceError
  });

  const raceErrorTooltipText = raceError
    ? 'Obstaw gonitwę, aby zatwierdzić zakład.'
    : '';

  return (
    <Tooltip title={raceErrorTooltipText}>
      <div className={classes}>
        <div className="multi-race-bet-tab__track">
          {trackName} {raceNumber}
        </div>
        {date}
      </div>
    </Tooltip>
  );
};

export const MultiRaceBet: React.FC<MultiRaceBetShape> = props => {
  const {
    races,
    multiBetSettings,
    multiBetType,
    multiplier,
    setMultiplier,
    betRacesData,
    setBetRacesData,
    setCurrentActiveRace
  } = props;

  const handleMultiplierChange = (newMultiplier: number) =>
    setMultiplier(newMultiplier);

  const handleReserveChange = (
    newReserveHorse: number,
    betRaceIndex: number
  ) => {
    const newData = betRacesData.map((betRaceData, betRaceDataIndex) => {
      if (betRaceIndex === betRaceDataIndex) {
        return {
          ...betRaceData,
          reserve: newReserveHorse
        };
      }
      return betRaceData;
    });

    setBetRacesData(newData);
  };

  const handleSelectionChange = (
    newSelection: HorseSelectionShape[],
    betRaceIndex: number
  ) => {
    const newData = betRacesData.map((betRaceData, betRaceDataIndex) => {
      const combinations = singleBetHelper.countCombinationsFromSelection(
        newSelection,
        races[betRaceIndex].activeHorseNumbers,
        multiBetType.betRaces[betRaceIndex].baseBetTypeApiCode
      );

      const unusedHorses = !disabledUnusedHorsesApiCodes.includes(
        multiBetType.betRaces[betRaceIndex].baseBetTypeApiCode
      )
        ? betHelper.prepareHorsesUnused(combinations, newSelection)
        : [];

      if (betRaceIndex === betRaceDataIndex) {
        return {
          ...betRaceData,
          horsesSelected: newSelection,
          combinations,
          unusedHorses
        };
      }
      return betRaceData;
    });

    setBetRacesData(newData);
  };

  return (
    <div className="multi-race-bet">
      <p className="multi-race-bet__tabs-bar-prefix">Gonitwa</p>
      <Tabs
        defaultActiveKey="bet-0"
        animated={false}
        onChange={activeKey =>
          setCurrentActiveRace(parseInt(activeKey.replace('bet-', '')))
        }
      >
        {multiBetType &&
          multiBetType.betRaces.map((betRace, index) => {
            const betRaceData = betRacesData[index];

            const raceDateFormatted = betRace.raceDay.raceDate
              ? DateHelper.formatDateDetailed(
                  new Date(betRace.raceDay.raceDate),
                  {
                    day: '2-digit',
                    month: '2-digit'
                  }
                )
              : '';

            const tab = (
              <MultiRaceBetTab
                trackName={`${betRace.raceDay.trackCode}`}
                raceNumber={betRace.raceNumber}
                date={raceDateFormatted}
                hasCombinations={!!betRaceData.combinations.length}
                hasUnusedHorses={
                  Array.isArray(betRaceData.unusedHorses)
                    ? betRaceData.unusedHorses.find(e => e.length)
                    : false
                }
              />
            );

            return (
              <TabPane tab={tab} key={`bet-${index}`}>
                <UnusedHorsesWarning unusedHorses={betRaceData.unusedHorses} />
                <SingleBetHorseSelection
                  race={races[index]}
                  rowsSelection={betRaceData.horsesSelected}
                  onSelectionChange={newSelection =>
                    handleSelectionChange(newSelection, index)
                  }
                  activeBetBoxAllowed={multiBetSettings.boxAllowed}
                  unusedHorses={betRaceData.unusedHorses}
                />
                {multiBetSettings.substituteAllowed && (
                  <HorseReserveRow
                    reserveHorses={races[index].activeHorseNumbers}
                    onReserveChange={newReserveHorse => {
                      handleReserveChange(newReserveHorse, index);
                    }}
                    activeReserve={betRaceData.reserve}
                  />
                )}
              </TabPane>
            );
          })}
      </Tabs>

      <MultipliersRow
        activeMultiplier={multiplier}
        onMultiplierChange={handleMultiplierChange}
      />
    </div>
  );
};

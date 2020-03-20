import React, { useContext, useState, useEffect } from 'react';
import MultiRaceBetTypeBlock from 'components/MultiRaceDay/MultiRaceBetTypeBlock';
import {
  GameStateRaceDayShape,
  GameStateMultiRaceBetTypeShape
} from 'interfaces/racedays/racedays';
import { AppContextShape } from 'interfaces/interfaces';
import { AppContext } from 'components/AppState/AppState';
import { betHelper } from 'helpers/bet.helper';
import { supportedBetTypesByApiCode } from 'helpers/apiBetTypeCodesHelper';
import { FullRaceDayInfoShape } from 'interfaces/infocenter/infocenter';

export const MultiRaceDay: React.FC<{
  raceDay: GameStateRaceDayShape;
  infocenterRaceDay: FullRaceDayInfoShape;
}> = props => {
  const {
    raceDay,
    multiRaceBetTypes,
    raceDayButtonLabel,
    uniqueId
  } = props.raceDay;
  let { raceDate, trackCode } = raceDay;
  const { infocenterRaceDay } = props;

  if (!raceDate) raceDate = 0;

  const activeMultiRaceBetTypes = multiRaceBetTypes.filter(
    multiRaceBetType =>
      multiRaceBetType.active === true &&
      supportedBetTypesByApiCode.includes(multiRaceBetType.betTypeApiCode)
  );

  const { state } = useContext<AppContextShape>(AppContext);

  const [betTypesDictionary, setBetTypesDictionary] = useState();

  useEffect(() => {
    setBetTypesDictionary(betHelper.buildBetTypesDictionary(state));
    /* eslint react-hooks/exhaustive-deps: 0 */
  }, []);

  return (
    <>
      {activeMultiRaceBetTypes.map(
        (multiRaceBetType: GameStateMultiRaceBetTypeShape) => {
          if (!multiRaceBetType || !betTypesDictionary) return null;

          const multiRaceBetTypeInfocenterData = infocenterRaceDay.data
            ? infocenterRaceDay.data.multiRaceBetTypes.find(
                multiRaceBetTypeInfocenterData =>
                  multiRaceBetTypeInfocenterData.uniqueId ===
                  multiRaceBetType.uniqueId
              )
            : undefined;

          const betTypeLabel =
            betTypesDictionary[multiRaceBetType.betTypeApiCode];
          return (
            <li
              className="multi-bet-types__item"
              key={multiRaceBetType.betTypeButtonLabel}
            >
              <MultiRaceBetTypeBlock
                trackName={trackCode}
                multiRaceBetType={multiRaceBetType}
                dayId={multiRaceBetType.uniqueId}
                raceDayButtonLabel={raceDayButtonLabel}
                betTypeLabel={betTypeLabel}
                raceDayId={uniqueId}
                infocenterData={infocenterRaceDay}
                multiRaceBetTypeInfocenterData={multiRaceBetTypeInfocenterData}
              />
            </li>
          );
        }
      )}
    </>
  );
};

import RaceBlock from 'components/RaceDay/RaceBlock/RaceBlock';
import { DateHelper } from 'helpers/date.helper';
import {
  GameStateRaceDayShape,
  GameStateRaceShape
} from 'interfaces/racedays/racedays';
import React from 'react';
import {
  FullRaceDayInfoShape,
  InfocenterRace,
  InfocenterRaceDay
} from 'interfaces/infocenter/infocenter';

const getRaceInfocenterData = (
  raceDayInfocenterData: InfocenterRaceDay | undefined,
  raceNumber: number
): InfocenterRace | undefined => {
  return raceDayInfocenterData
    ? raceDayInfocenterData.races.find(race => race.raceNumber === raceNumber)
    : undefined;
};

export const RaceDay: React.FC<{
  raceDay: GameStateRaceDayShape;
  infocenterRaceDay: FullRaceDayInfoShape;
}> = props => {
  const { races, raceDay, raceDayNumber, uniqueId, eventsPlace } = props.raceDay;
  let { raceDate, trackCode } = raceDay;

  if (!raceDate) raceDate = 0;
  const formatDate = DateHelper.formatDateFriendly(new Date(raceDate));
  let place = '';
  if (eventsPlace !== null) place = '- ' + eventsPlace
  const activeRaces = races.filter(race => race.raceStatus === 'ACTIVE');

  return (
    <section className={'races'}>
      <p className={'races__title'}>
        <strong>Tor {trackCode}</strong> - {formatDate} {place}
      </p>
      <ul className={'races__list'}>
        {activeRaces.map((race: GameStateRaceShape) => {
          if (!race) return null;

          const raceInfocenterData = !props.infocenterRaceDay.loading
            ? getRaceInfocenterData(
              props.infocenterRaceDay.data,
              race.raceNumber
            )
            : undefined;

          return (
            <li key={race.raceNumber}>
              <RaceBlock
                trackName={trackCode}
                race={race}
                uniqueId={race.uniqueId}
                isPoolLoading={props.infocenterRaceDay.loading}
                infocenterData={raceInfocenterData}
                dayId={raceDayNumber}
                uniqueDayId={uniqueId}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

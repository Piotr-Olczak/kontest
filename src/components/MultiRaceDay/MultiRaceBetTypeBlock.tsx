import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { BetPool } from 'components/BetPool/BetPool';
import Button from 'components/Button/Button';
import { DateHelper } from 'helpers/date.helper';
import { APP_URLS } from 'helpers/url.helper';
import {
  FullRaceDayInfoShape,
  InfocenterMultiRaceBetType
} from 'interfaces/infocenter/infocenter';
import {
  GameStateMultiRaceBetTypeRace,
  GameStateMultiRaceBetTypeShape
} from 'interfaces/racedays/racedays';

interface MultiRaceBetTypeBlockPropsShape extends RouteComponentProps {
  multiRaceBetType: GameStateMultiRaceBetTypeShape;
  trackName?: string;
  dayId: string;
  raceDayButtonLabel: string;
  betTypeLabel: string;
  raceDayId: string;
  infocenterData: FullRaceDayInfoShape;
  multiRaceBetTypeInfocenterData?: InfocenterMultiRaceBetType;
}

const MultiRaceBetTypeBlock = (props: MultiRaceBetTypeBlockPropsShape) => {
  const { infocenterData } = props;
  const { betRaces } = props.multiRaceBetType;

  const betTypeLabel = props.betTypeLabel;

  const redirectToRacePage = () => {
    props.history.push(
      APP_URLS.multiRacesList +
        props.raceDayId +
        '/' +
        props.multiRaceBetType.uniqueId
    );
  };

  const pool = props.multiRaceBetTypeInfocenterData
    ? props.multiRaceBetTypeInfocenterData.pool
    : 0;

  return (
    <>
      <article className="multi-race-bet">
        <header className="multi-race-bet__title">
          <p>{betTypeLabel}</p>
          <BetPool loading={infocenterData.loading} pool={pool} />
        </header>
        <table className="multi-race-bet__table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Tor</th>
              <th className="multi-race-bet__table-race-no-header">Gonitwa</th>
            </tr>
          </thead>
          <tbody>
            {betRaces.map((race: GameStateMultiRaceBetTypeRace) => {
              const { raceDay, raceNumber } = race;
              const formatDate = raceDay.raceDate
                ? DateHelper.formatSecondsToMonthDay(raceDay.raceDate)
                : '';
              return (
                <tr key={`${formatDate}/${raceDay.trackCode}/${raceNumber}`}>
                  <td>{formatDate}</td>
                  <td>{raceDay.trackCode}</td>
                  <td className="multi-race-bet__table-race-no">
                    {raceNumber}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </article>
      <div className="multi-race-bet__cover">
        <Button
          label="Postaw zakład"
          buttonStyle="empty-light"
          onClickFunction={redirectToRacePage}
        />
      </div>
    </>
  );
};

export default withRouter<MultiRaceBetTypeBlockPropsShape, any>(
  MultiRaceBetTypeBlock
);

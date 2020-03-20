import React, { useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { APP_URLS } from 'helpers/url.helper';
import { GameStateRaceShape } from 'interfaces/racedays/racedays';
import { BetPool } from 'components/BetPool/BetPool';
import { AppContext } from 'components/AppState/AppState';
import { AppContextShape } from 'interfaces/interfaces';
import {
  InfocenterRace,
  InfocenterSingleRaceBetType
} from 'interfaces/infocenter/infocenter';
import { findElementWithMaximumValue } from 'helpers/utils';

interface RaceBlock extends RouteComponentProps {
  race: GameStateRaceShape;
  uniqueId: string;
  isPoolLoading: boolean;
  infocenterData: InfocenterRace | undefined;
  trackName?: string;
  trackMap?: string;
  dayId?: number;
  uniqueDayId: string;
}

const RaceBlock = (props: RaceBlock) => {
  const { state } = useContext<AppContextShape>(AppContext);
  const { raceNumber } = props.race;
  const { longDescription } = props.race;

  const trackMaps: any = state.systemSettings.tracksMap;
  const redirectToRacePage = () => {
    props.history.push(
      APP_URLS.singleRacesList + `${props.uniqueDayId}/${raceNumber}`
    );
  };

  const singleRaceBetTypeWithMaxPool: InfocenterSingleRaceBetType | undefined =
    props.infocenterData && props.infocenterData.singleRaceBetTypes
      ? findElementWithMaximumValue(
        props.infocenterData.singleRaceBetTypes,
        'pool'
      )
      : undefined;

  const pool: number = singleRaceBetTypeWithMaxPool
    ? singleRaceBetTypeWithMaxPool.pool
    : 0;

  return (
    <article className={'race-block'} onClick={redirectToRacePage}>
      <header className={'race-block__header'}>
        <p className={'race-block__id'}>{raceNumber}</p>
        <BetPool
          loading={props.isPoolLoading}
          pool={pool}
          extraClasses={'race-block__price'}
        />
      </header>
      <footer className={'race-block__footer'}>
        <p>{trackMaps['' + props.trackName + ''].courseFullName}</p>
        <p>{longDescription}</p>
        {/* <p>{props.trackName} trackMap:{trackMaps['' + props.trackName + ''].courseFullName}</p> */}
      </footer>
    </article>
  );
};

export default withRouter<RaceBlock, any>(RaceBlock);

import BasicLayout from 'components/BasicLayout/BasicLayout';
import SingleRaceBet from 'components/SingleRaceBet/SingleRaceBet';
import { SingleRaceBetSummary } from 'components/SingleRaceBetSummary/SingleRaceBetSummary';
import { Spinner } from 'components/Spinner/Spinner';
import {
  SingleBetContext,
  SingleBetContextProvider
} from 'contexts/singleBet.context';
import { gameStateHelper } from 'helpers/gameState.helper';
import { GameStateShape } from 'interfaces/racedays/racedays';
import { EmptyBetPage } from 'pages/EmptyBetPage/EmptyBetPage';
import React, { useContext, useEffect, useState } from 'react';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import { infocenterHelper } from 'helpers/infocenter.helper';
import { BetRaceInfocenterDataShape } from 'interfaces/infocenter/infocenter';
import { InfocenterHeader } from 'components/InfocenterHeader/InfocenterHeader';
import { SingleRaceBetInfocenterHorsesTable } from 'components/SingleRaceBetInfocenterHorsesTable/SingleRaceBetInfocenterHorsesTable';
import { LinkBackToRaces } from 'components/LinkBackToRaces/LinkBackToRaces';

const SingleRaceBetPage: React.FC<RouteComponentProps> = props => {
  const { raceDayId, raceId }: any = props.match.params;
  const [race, setRace] = useState();
  const [dayName, setDayName] = useState();
  const [raceDayInfo, setRaceDayInfo] = useState();

  const [infocenterFullRaceInfo, setInfocenterFullRaceInfo] = useState<
    BetRaceInfocenterDataShape
  >({ isLoading: true });

  const [gameState, setGameState] = useState();
  const { singleBetState, setSingleBetState } = useContext(SingleBetContext);

  useEffect(() => {
    // When gameState changes (fetchFromApi) - set race and day based on route params
    if (gameState) {
      const activeRace = gameStateHelper.getActiveRaceByDay(
        gameState,
        raceDayId,
        raceId
      );
      const activeRaceDayInfo = gameStateHelper.getActiveRaceDayInfo(
        gameState,
        raceDayId
      );

      const raceNumber: number | undefined = activeRace
        ? activeRace.raceNumber
        : undefined;

      setRace(activeRace);
      setDayName(gameStateHelper.getActiveRaceDayName(gameState, raceDayId));
      setRaceDayInfo(activeRaceDayInfo);

      if (
        raceNumber &&
        activeRaceDayInfo.trackCode &&
        activeRaceDayInfo.raceDate
      ) {
        infocenterHelper
          .fetchFullRaceInfo({
            raceDay: {
              raceDate: activeRaceDayInfo.raceDate,
              trackCode: activeRaceDayInfo.trackCode,
              eventsPlace: activeRaceDayInfo.eventsPlace
            },
            raceNumber: raceNumber
          })
          .then(data =>
            setInfocenterFullRaceInfo({ data: data, isLoading: false })
          )
          .catch(err =>
            setInfocenterFullRaceInfo({ isLoading: false, data: undefined })
          );
      }

      setSingleBetState({
        ...singleBetState,
        race: activeRace,
        raceDayInfo: raceDayInfo
      });
    }

    /* Observe only gameState because observing all depedencies used in hook cause loop of updates  */
    /* eslint react-hooks/exhaustive-deps: 0 */
  }, [gameState]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    gameStateHelper
      .fetchGameState()
      .then((gameState: GameStateShape) => {
        setGameState(gameState);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, []);

  if (!race && !isLoading) return <EmptyBetPage />;

  if (isLoading)
    return (
      <BasicLayout activeBackground={true}>
        <section className={'single-bet'}>
          <Spinner />
        </section>
      </BasicLayout>
    );

  return (
    <BasicLayout activeBackground={true}>
      <SingleBetContextProvider>
        <LinkBackToRaces />
        <section className={'single-bet'}>
          <article className={'single-bet__content'}>
            <InfocenterHeader
              dayName={dayName}
              raceNumber={race.raceNumber}
              infocenter={infocenterFullRaceInfo.data}
              isLoading={infocenterFullRaceInfo.isLoading}
            />
            <SingleRaceBet
              race={race}
              dayName={dayName}
              raceDayInfo={raceDayInfo}
            />
            {infocenterFullRaceInfo.data &&
              infocenterFullRaceInfo.data.horsesExtraInfo && (
                <SingleRaceBetInfocenterHorsesTable
                  horsesExtraInfo={infocenterFullRaceInfo.data.horsesExtraInfo}
                />
              )}
          </article>
          <aside className={'single-bet__summary'}>
            <SingleRaceBetSummary
              race={race}
              raceDayInfo={raceDayInfo}
              infocenterFullRaceInfo={infocenterFullRaceInfo.data}
            />
          </aside>
        </section>
      </SingleBetContextProvider>
    </BasicLayout>
  );
};

export default withRouter(SingleRaceBetPage);

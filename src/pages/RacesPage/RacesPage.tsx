import BasicLayout from 'components/BasicLayout/BasicLayout';
import { RaceDay } from 'components/RaceDay/RaceDay';
import { MultiRaceDay } from 'components/MultiRaceDay/MultiRaceDay';
import { Spinner } from 'components/Spinner/Spinner';
import { gameStateHelper } from 'helpers/gameState.helper';
import {
  GameStateRaceDayShape,
  GameStateShape
} from 'interfaces/racedays/racedays';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import React, { useEffect, useState } from 'react';
import { Alert, Tabs } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

import { infocenterHelper } from 'helpers/infocenter.helper';
import {
  FullRaceDayInfosShape,
  InfocenterRaceDay
} from 'interfaces/infocenter/infocenter';

const GameStateContext = React.createContext<GameStateShape>(
  new GameStateShape()
);

const RacesPage: React.FC<RouteComponentProps> = ({
  location
}: RouteComponentProps) => {
  const [isLoading, setIsLoading] = useState();
  const [hasError, setHasError] = useState(false);
  const [gameState, setGameState] = useState(new GameStateShape());
  const [fullRaceDayInfos, setFullRaceDayInfos] = useState<
    FullRaceDayInfosShape
  >({});

  const activeTab =
    location.state && location.state.activeTab
      ? location.state.activeTab
      : 'singleRaceBets';

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    gameStateHelper
      .fetchGameState()
      .then((gameState: GameStateShape) => {
        setGameState(gameState);
        // prepare data structure for infocenter data
        gameState.activeRaceDays.forEach(activeRaceDay =>
          updateFullRaceDayInfo(activeRaceDay.uniqueId, true)
        );

        setIsLoading(false);

        setHasError(false);
      })
      .catch(err => {
        setIsLoading(false);
        setHasError(true);
      });
  }, []);

  const updateFullRaceDayInfo = (
    uniqueId: string,
    loading: boolean,
    data?: InfocenterRaceDay
  ) => {
    setFullRaceDayInfos(oldState => {
      const newState = {
        ...oldState,
        [uniqueId]: {
          loading,
          data
        }
      };

      return newState;
    });
  };

  useEffect(() => {
    gameState.activeRaceDays.forEach(activeRaceDay => {
      infocenterHelper
        .fetchFullRaceDayInfo(activeRaceDay.raceDay)
        .then(data => {
          updateFullRaceDayInfo(activeRaceDay.uniqueId, false, data);
        })
        .catch(err => {
          updateFullRaceDayInfo(activeRaceDay.uniqueId, false);
        });
    });
  }, [gameState.activeRaceDays]);

  if (!gameState) return <ErrorPage />;

  const { TabPane } = Tabs;

  const multiRaceBetsActiveKey =
    location.state && location.state.activeSubTab
      ? location.state.activeSubTab
      : gameState &&
        gameState.activeRaceDays[0] &&
        gameState.activeRaceDays[0].raceDayButtonLabel;

  return (
    <BasicLayout activeBackground={true} extraClasses="race-page-wrapper">
      <GameStateContext.Provider value={gameState}>
        <h1 className={'race-page-title'}>Najbliższe gonitwy i zakłady</h1>
        {isLoading && <Spinner />}
        {hasError && (
          <Alert
            message="Przykro nam, wystąpił błąd. Proszę spróbować później."
            type="error"
          />
        )}
        <Tabs defaultActiveKey={activeTab}>
          <TabPane tab="Zakłady jednogonitwowe" key="singleRaceBets">
            {!isLoading && !hasError && (
              <section className="race-tracks">
                {gameState.activeRaceDays.map(
                  (raceDay: GameStateRaceDayShape) => {
                    return (
                      <RaceDay
                        raceDay={raceDay}
                        key={raceDay.raceDayButtonLabel}
                        infocenterRaceDay={fullRaceDayInfos[raceDay.uniqueId]}
                      />
                    );
                  }
                )}
              </section>
            )}
          </TabPane>
          <TabPane tab="Zakłady wielogonitwowe" key="multiRaceBets">
            {!isLoading && !hasError && (
              <section className="race-tracks">
                <section className="multi-bet-types">
                  <Tabs defaultActiveKey={multiRaceBetsActiveKey}>
                    {gameState.activeRaceDays.map(
                      (raceDay: GameStateRaceDayShape) => (
                        <TabPane
                          tab={raceDay.raceDayButtonLabel}
                          key={raceDay.raceDayButtonLabel}
                        >
                          <h2>{raceDay.raceDayButtonLabel}</h2>
                          <ul className="multi-bet-types__list">
                            <MultiRaceDay
                              raceDay={raceDay}
                              key={raceDay.raceDayButtonLabel}
                              infocenterRaceDay={
                                fullRaceDayInfos[raceDay.uniqueId]
                              }
                            />
                          </ul>
                        </TabPane>
                      )
                    )}
                  </Tabs>
                </section>
              </section>
            )}
          </TabPane>
        </Tabs>
      </GameStateContext.Provider>
    </BasicLayout>
  );
};

export default RacesPage;

import BasicLayout from 'components/BasicLayout/BasicLayout';
import { Spinner } from 'components/Spinner/Spinner';
import { BetRaceDataShape } from 'interfaces/MultiRaceBet/MultiRaceBet';
import { gameStateHelper } from 'helpers/gameState.helper';
import { APP_URLS } from 'helpers/url.helper';
import {
  GameStateShape,
  GameStateMultiRaceBetTypeRace,
  GameStateRaceDayShape,
  GameStateMultiRaceBetTypeShape
} from 'interfaces/racedays/racedays';
import { EmptyBetPage } from 'pages/EmptyBetPage/EmptyBetPage';
import React, { useContext, useEffect, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { MultiRaceBet } from 'components/MultiRaceBet/MultiRaceBet';
import { MultiRaceBetSummary } from 'components/MultiRaceBetSummary/MultiRaceBetSummary';
import { AppContextShape } from 'interfaces/interfaces';
import { systemSettingsHelper } from 'helpers/systemSettings.helper';
import { generateArray } from 'helpers/utils';
import { HorseSelectionShape } from 'interfaces/HorseSelection/HorseSelectionShape';
import { AppContext } from 'components/AppState/AppState';
import { RaceBetTypeSettingsShape } from 'interfaces/raceday/raceday';
import { supportedBetTypesByApiCode } from 'helpers/apiBetTypeCodesHelper';
import { betHelper } from 'helpers/bet.helper';
import { infocenterHelper } from 'helpers/infocenter.helper';
import {
  InfocenterMultiRaceBetType,
  BetRaceInfocenterDataShape
} from 'interfaces/infocenter/infocenter';
import { InfocenterHorsesTable } from 'components/InfocenterHorsesTable/InfocenterHorsesTable';
import { InfocenterHeader } from 'components/InfocenterHeader/InfocenterHeader';
import { DateHelper } from 'helpers/date.helper';

interface MultiRaceBetPageRouteParams {
  raceDayId: string;
  multiRaceBetId: string;
}

const generateSelectionForBetRace = (
  settings: RaceBetTypeSettingsShape | undefined
): HorseSelectionShape[] => {
  if (!settings) return [];

  return generateArray<HorseSelectionShape>(
    settings.rowsToBet,
    new HorseSelectionShape()
  );
};

const mapBetRacesData = (
  betRaces: Array<GameStateMultiRaceBetTypeRace>,
  betRacesSettings: Array<RaceBetTypeSettingsShape | undefined>
): Array<BetRaceDataShape> =>
  betRaces.map((betRace, betRaceIndex) => {
    const settings = betRacesSettings[betRaceIndex];

    return {
      horsesSelected: generateSelectionForBetRace(settings),
      unusedHorses: [],
      combinations: [],
      reserve: 0
    };
  });

const MultiRaceBetPage: React.FC<
  RouteComponentProps<MultiRaceBetPageRouteParams>
> = props => {
  const {
    raceDayId,
    multiRaceBetId
  }: MultiRaceBetPageRouteParams = props.match.params;

  const [races, setRaces] = useState();
  const [raceDay, setRaceDay] = useState<GameStateRaceDayShape>();
  const [multiBetType, setMultiBetType] = useState<
    GameStateMultiRaceBetTypeShape
  >();
  const [multiBetSettings, setMultiBetSettings] = useState();

  const [multiplier, setMultiplier] = useState(1);
  const [betRacesData, setBetRacesData] = useState();
  const [isBetTypeSupported, setIsBetTypeSupported] = useState(true);

  const [gameState, setGameState] = useState();

  const [betTypesDictionary, setBetTypesDictionary] = useState();

  const [multiBetTypeRaceDayInfo, setMultiBetTypeRaceDayInfo] = useState<
    InfocenterMultiRaceBetType
  >();

  const [currentActiveRace, setCurrentActiveRace] = useState<number>();

  const [betRaceInfocenterData, setBetRaceInfocenterData] = useState<
    BetRaceInfocenterDataShape
  >({ isLoading: true });

  const { state } = useContext<AppContextShape>(AppContext);

  useEffect(() => {
    // When gameState changes (fetchFromApi) - set race and day based on route params
    if (gameState) {
      const activeRaceDay = gameStateHelper.getActiveRaceDay(
        gameState,
        raceDayId
      );

      const activeMultiBetType = gameStateHelper.getActiveMultiBetType(
        activeRaceDay,
        multiRaceBetId
      );

      const activeRaces =
        gameState && activeMultiBetType
          ? gameStateHelper.getMultiBetActiveRaces(
              gameState,
              activeMultiBetType
            )
          : [];

      setRaceDay(activeRaceDay);
      setMultiBetType(activeMultiBetType);
      setRaces(activeRaces);

      if (!activeMultiBetType) return;

      setIsBetTypeSupported(
        supportedBetTypesByApiCode.includes(activeMultiBetType.betTypeApiCode)
      );

      const multiBetSettings = systemSettingsHelper.getSettingsForBetType(
        state.systemSettings,
        activeMultiBetType.betTypeApiCode
      );

      setMultiBetSettings(multiBetSettings);

      const betRacesSettings: Array<
        RaceBetTypeSettingsShape | undefined
      > = activeMultiBetType.betRaces.map(betRace => {
        return systemSettingsHelper.getSettingsForBetType(
          state.systemSettings,
          betRace.baseBetTypeApiCode
        );
      });

      const betRacesData = mapBetRacesData(
        activeMultiBetType.betRaces,
        betRacesSettings
      );

      setBetRacesData(betRacesData);

      setBetTypesDictionary(betHelper.buildBetTypesDictionary(state));
    }
  }, [gameState, multiRaceBetId, raceDayId, state]);

  const [isLoading, setIsLoading] = useState(true);

  const multiRacePageLocationDescription = {
    pathname: APP_URLS.racesList,
    state: {
      activeTab: 'multiRaceBets',
      activeSubTab: raceDay ? raceDay.raceDayButtonLabel : ''
    }
  };
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

  useEffect(() => {
    if (raceDay && multiBetType) {
      infocenterHelper
        .fetchFullRaceDayInfo(raceDay.raceDay)
        .then(infocenterFullRaceDayInfo => {
          const multiRaceBetInfocenterData = infocenterFullRaceDayInfo.multiRaceBetTypes.find(
            multiRaceBet => multiRaceBet.uniqueId === multiBetType.uniqueId
          );
          if (multiRaceBetInfocenterData) {
            setMultiBetTypeRaceDayInfo(multiRaceBetInfocenterData);
          }
        });
    }
  }, [raceDay, multiBetType]);

  // trigger "first update"
  useEffect(() => {
    setCurrentActiveRace(0);
  }, []);

  useEffect(() => {
    if (
      typeof currentActiveRace !== 'undefined' &&
      multiBetType &&
      multiBetType.betRaces
    ) {
      const activeBetRace = multiBetType.betRaces[currentActiveRace];

      const { raceDay, raceNumber } = activeBetRace;

      setBetRaceInfocenterData({ isLoading: true, data: undefined });

      infocenterHelper
        .fetchFullRaceInfo({
          raceDay,
          raceNumber
        })
        .then(raceInfo =>
          setBetRaceInfocenterData({
            isLoading: false,
            data: raceInfo
          })
        )
        .catch(err =>
          setBetRaceInfocenterData({ isLoading: false, data: undefined })
        );
    }
  }, [currentActiveRace, multiBetType]);

  if ((!races && !isLoading) || !isBetTypeSupported) return <EmptyBetPage />;

  if (isLoading)
    return (
      <BasicLayout activeBackground={true}>
        <section className={'multi-bet'}>
          <Spinner />
        </section>
      </BasicLayout>
    );

  const currentRaceHorsesSelected =
    betRacesData && typeof currentActiveRace !== 'undefined'
      ? betRacesData[currentActiveRace].horsesSelected
      : [];

  return (
    <BasicLayout activeBackground={true}>
      <Link to={multiRacePageLocationDescription}>
        {'<<'}Powrót do listy gonitw
      </Link>

      {raceDay && multiBetType && (
        <section className={'multi-bet'}>
          <article className={'multi-bet__content'}>
            <InfocenterHeader
              dayName={
                betRaceInfocenterData.data &&
                betRaceInfocenterData.data.startDate
                  ? DateHelper.formatDateFriendly(
                      new Date(betRaceInfocenterData.data.startDate)
                    )
                  : ''
              }
              raceNumber={
                betRaceInfocenterData.data &&
                betRaceInfocenterData.data.raceNumber
              }
              infocenter={betRaceInfocenterData.data}
              isLoading={betRaceInfocenterData.isLoading}
            />

            <header className={'bet-content__header'}>
              <p>Zakład: {betTypesDictionary[multiBetType.betTypeApiCode]}</p>
            </header>
            <section className={'bet-content__body'}>
              <MultiRaceBet
                races={races}
                raceDay={raceDay}
                multiBetType={multiBetType}
                multiBetSettings={multiBetSettings}
                multiplier={multiplier}
                setMultiplier={setMultiplier}
                betRacesData={betRacesData}
                setBetRacesData={setBetRacesData}
                setCurrentActiveRace={setCurrentActiveRace}
              />
            </section>
            {!betRaceInfocenterData.isLoading &&
              betRaceInfocenterData.data &&
              betRaceInfocenterData.data.horsesExtraInfo && (
                <InfocenterHorsesTable
                  horsesExtraInfo={betRaceInfocenterData.data.horsesExtraInfo}
                  horsesSelected={currentRaceHorsesSelected}
                />
              )}
          </article>
          <aside className={'multi-bet__summary'}>
            <MultiRaceBetSummary
              raceDay={raceDay}
              multiBetType={multiBetType}
              multiplier={multiplier}
              betRacesData={betRacesData}
              raceDayInfo={multiBetTypeRaceDayInfo}
            />
          </aside>
        </section>
      )}
    </BasicLayout>
  );
};

export default withRouter(MultiRaceBetPage);

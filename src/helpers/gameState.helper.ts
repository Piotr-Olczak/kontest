import { apiGetData } from 'helpers/apiConnector';
import {
  GameStateRaceDayShape,
  GameStateRaceShape,
  GameStateShape,
  SingleRaceBetTypeShape,
  RaceDayShape,
  GameStateMultiRaceBetTypeShape,
  GameStateMultiRaceBetTypeRace
} from 'interfaces/racedays/racedays';

class GameStateHelper {
  fetchGameState(): Promise<GameStateShape> {
    const canUseRandomSeed = process.env.NODE_ENV === 'development';
    const searchParams = new URLSearchParams(window.location.search);
    const randomSeedValue = searchParams.get('randomSeed');

    const apiUrl =
      canUseRandomSeed && randomSeedValue
        ? `/player-public/get-random-game-state?randomSeed=${randomSeedValue}`
        : '/player/gambling/get-game-state';

    return apiGetData(apiUrl);
  }

  getActiveRaceByDay(
    gameState: GameStateShape,
    raceDayId: string,
    raceId: number
  ): GameStateRaceShape | undefined {
    const activeRaceDay = this.getActiveRaceDay(gameState, raceDayId);
    if (!activeRaceDay) return;
    return this.getActiveRace(activeRaceDay, raceId);
  }

  getActiveRaceDay(
    gameState: GameStateShape,
    raceDayId: string
  ): GameStateRaceDayShape | undefined {
    return gameState.activeRaceDays.find(
      raceDay => raceDay.uniqueId === raceDayId
    );
  }

  getActiveRaceDayName(gameState: GameStateShape, raceDayId: string): string {
    const activeDay = this.getActiveRaceDay(gameState, raceDayId);
    if (!activeDay) return '';
    return activeDay.raceDayButtonLabel;
  }

  getActiveRaceDayInfo(
    gameState: GameStateShape,
    raceDayId: string
  ): RaceDayShape {
    const activeDay = this.getActiveRaceDay(gameState, raceDayId);
    if (!activeDay) return { trackCode: '', raceDate: 0, eventsPlace: '' };
    return activeDay.raceDay;
  }

  getActiveRace(
    raceDay: GameStateRaceDayShape,
    raceId: number
  ): GameStateRaceShape | undefined {
    return raceDay.races
      .filter(race => race.raceStatus === 'ACTIVE')
      .find(race => Number(race.raceNumber) === Number(raceId));
  }

  getActiveBetTypes(race: GameStateRaceShape): Array<SingleRaceBetTypeShape> {
    return race.singleRaceBetTypes.filter(raceBet => raceBet.active);
  }

  getActiveMultiRaceDayByIdentifier(
    raceDayIdentifier: string,
    gameState: GameStateShape
  ): GameStateRaceDayShape | undefined {
    return gameState.activeRaceDays.find(
      (raceDay: GameStateRaceDayShape) =>
        raceDay.raceDayButtonLabel === raceDayIdentifier
    );
  }

  getActiveMultiBetType(
    activeRaceDay: GameStateRaceDayShape | undefined,
    betTypeId: string
  ): GameStateMultiRaceBetTypeShape | undefined {
    return (
      activeRaceDay &&
      activeRaceDay.multiRaceBetTypes.find(
        (multiBetType: GameStateMultiRaceBetTypeShape) =>
          multiBetType.uniqueId === betTypeId && multiBetType.active === true
      )
    );
  }

  getMultiBetActiveRaces(
    gameState: GameStateShape,
    activeMultiBetType: GameStateMultiRaceBetTypeShape
  ): (GameStateRaceShape | undefined)[] {
    const activeRaces = activeMultiBetType.betRaces.map(
      (betRace: GameStateMultiRaceBetTypeRace) => {
        const multiBetActiveRaceDays = gameState.activeRaceDays.find(
          (activeRaceDay: GameStateRaceDayShape) =>
            activeRaceDay.raceDay.trackCode === betRace.raceDay.trackCode &&
            activeRaceDay.raceDay.raceDate === betRace.raceDay.raceDate
        );

        return (
          multiBetActiveRaceDays &&
          multiBetActiveRaceDays.races.find(
            (race: GameStateRaceShape) =>
              race.raceNumber === betRace.raceNumber &&
              race.raceStatus === 'ACTIVE'
          )
        );
      }
    );

    return activeRaces;
  }
}

export const gameStateHelper = new GameStateHelper();

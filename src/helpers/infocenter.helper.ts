import { apiPostData } from 'helpers/apiConnector';
import { RaceDayShape } from 'interfaces/racedays/racedays';
import {
  InfocenterRaceDay,
  EkonikRace,
  InfocenterRace
} from 'interfaces/infocenter/infocenter';

class InfocenterHelper {
  fetchFullRaceDayInfo(raceDay: RaceDayShape): Promise<InfocenterRaceDay> {
    return apiPostData('/infocenter/gambling/get-full-race-day-info', raceDay);
  }

  fetchFullRaceInfo(race: EkonikRace): Promise<InfocenterRace> {
    return apiPostData('infocenter/gambling/get-full-race-info', race);
  }

  displayInfocenterData = (data?: string | number, suffix?: string) => {
    const displayedSuffix = suffix ? suffix : '';
    return data ? `${data}${displayedSuffix}` : '-';
  };
}

export const infocenterHelper = new InfocenterHelper();

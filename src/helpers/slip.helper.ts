import { RaceDayInfoShape } from 'contexts/singleBet.context';
import { DateHelper } from './date.helper';
import { SlipRaceBetShape } from 'interfaces/slip/slip';

interface FormattedRaceDayShape {
  trackCode: string;
  raceDate: string;
}

const mapSingleRaceDescription = (
  description: string,
  raceDay: FormattedRaceDayShape
): SlipRaceBetShape => {
  return {
    trackCode: raceDay.trackCode,
    raceDate: raceDay.raceDate,
    raceNumber: description
  };
};

const mapMultiRaceDescription = (
  description: string,
  raceDay: FormattedRaceDayShape
): Array<SlipRaceBetShape> => {
  const raceNumbers: Array<string> = description.split(',');

  return raceNumbers.map(raceNumber =>
    mapSingleRaceDescription(raceNumber, raceDay)
  );
};

const mapMultiRaceMultiDayDescription = (
  description: string
): Array<SlipRaceBetShape> => {
  const races: Array<string> = description.split('|');

  return races.map(race => {
    const raceElements = race.split(' ');

    return {
      trackCode: raceElements[0],
      raceDate: raceElements[1],
      raceNumber: raceElements[2]
    };
  });
};

class SlipHelper {
  mapRacesDescription(
    raceDesciption: string,
    raceDay: RaceDayInfoShape
  ): Array<SlipRaceBetShape> {
    let data;

    const raceDayFormatted = {
      trackCode: raceDay.trackCode,
      raceDate: DateHelper.formatDateFriendly(new Date(raceDay.raceDate))
    };

    if (raceDesciption.includes('|')) {
      // Multiday races with multi day are separated by '|'
      data = mapMultiRaceMultiDayDescription(raceDesciption);
    } else if (raceDesciption.includes(',')) {
      // Multiday races with multi day are separated by ','
      data = mapMultiRaceDescription(raceDesciption, raceDayFormatted);
    } else {
      // there is no separation
      data = [mapSingleRaceDescription(raceDesciption, raceDayFormatted)];
    }

    return data;
  }

  isMaxSlipAmountExceeded(amount: number, limit: number): boolean {
    if (limit === 0) return false;

    return amount > limit;
  }
}

export const slipHelper = new SlipHelper();

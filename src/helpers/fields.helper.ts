import { apiGetData } from 'helpers/apiConnector';
import { DateHelper } from 'helpers/date.helper';
import { AppStateShape, PasswordSettingsShape } from 'interfaces/interfaces';

export class FieldsHelper {
  static isValidPesel(pesel: string): boolean {
    if (pesel) {
      const weights = [9, 7, 3, 1, 9, 7, 3, 1, 9, 7];
      let sum = 0;

      for (let i = 0; i < weights.length; i++) {
        sum += parseInt(pesel.substring(i, i + 1), 10) * weights[i];
      }

      sum = sum % 10;

      const controlNumber = parseInt(pesel.substring(10, 11), 10);
      const isValid = sum === controlNumber;
      return isValid;
    }
    return false;
  }

  static isDuplicatedPesel(
    pesel: string,
    currentPesel?: string
  ): Promise<any> | boolean {
    if (currentPesel && currentPesel === pesel) {
      return false;
    }
    if (pesel && this.isValidPesel(pesel)) {
      const queryParams = new URLSearchParams();
      queryParams.set('pesel', pesel);
      const checkPeselApiUrl: string =
        '/player-public//check-if-pesel-is-currently-used';
      const queryUrl: string = `${checkPeselApiUrl}?${queryParams.toString()}`;
      return apiGetData(queryUrl);
    } else {
      return false;
    }
  }

  static isValidEmail(email: string): boolean {
    // eslint-disable-next-line no-useless-escape
    var validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validEmailRegex.test(String(email).toLowerCase());
  }

  static isDuplicatedEmail(
    email: string,
    currentEmail?: string
  ): Promise<any> | boolean {
    if (currentEmail && currentEmail === email) {
      return false;
    }
    if (this.isValidEmail(email)) {
      const queryParams = new URLSearchParams();
      queryParams.set('emailAddress', email);
      const checkEmailApiUrl: string =
        '/player-public/check-if-email-is-currently-used';
      const queryUrl: string = `${checkEmailApiUrl}?${queryParams.toString()}`;
      return apiGetData(queryUrl);
    } else {
      return false;
    }
  }

  static isAdult(formFields: any): boolean {
    const { birthYear, birthMonth, birthDay } = formFields;
    let age: number = 0;
    if (
      typeof birthDay !== 'undefined' &&
      typeof birthMonth !== 'undefined' &&
      typeof birthYear !== 'undefined'
    ) {
      if (
        (birthDay.length === 2 && birthMonth.length === 2,
        birthYear.length === 4)
      ) {
        var birthDate = `${birthMonth}/${birthDay}/${birthYear}`;
        age = DateHelper.calculateAge(new Date(birthDate));
      }
    }
    return age >= 18;
  }

  static ifAtLeastOneLetter(value: string): boolean {
    return /[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż]/.test(value);
  }

  static limit1dTimeRange(
    formFields: any,
    testTime: number,
    type: 'max' | 'min'
  ): boolean {
    const { timeLimit1dHours, timeLimit1dMinutes } = formFields;
    const hours1d =
      typeof timeLimit1dHours !== 'undefined' ? Number(timeLimit1dHours) : 0;
    const minutes1d =
      typeof timeLimit1dMinutes !== 'undefined'
        ? Number(timeLimit1dMinutes)
        : 0;
    const timeLimit = DateHelper.hoursMinutesToSeconds(hours1d, minutes1d);

    return type === 'min' ? timeLimit >= testTime : timeLimit <= testTime;
  }

  static limit1mTimeRange(
    formFields: any,
    testTime: number,
    type: 'max' | 'min'
  ): boolean {
    const { timeLimit1mHours, timeLimit1mMinutes } = formFields;
    const hours1m =
      typeof timeLimit1mHours !== 'undefined' ? Number(timeLimit1mHours) : 0;
    const minutes1m =
      typeof timeLimit1mMinutes !== 'undefined'
        ? Number(timeLimit1mMinutes)
        : 0;
    const timeLimit = DateHelper.hoursMinutesToSeconds(hours1m, minutes1m);

    return type === 'min' ? timeLimit >= testTime : timeLimit <= testTime;
  }

  static isTimeDailyGreaterThanMonthly(formFields: any): boolean {
    const {
      timeLimit1dHours,
      timeLimit1dMinutes,
      timeLimit1mHours,
      timeLimit1mMinutes
    } = formFields;
    const hours1d =
      typeof timeLimit1dHours !== 'undefined' ? Number(timeLimit1dHours) : 0;
    const minutes1d =
      typeof timeLimit1dMinutes !== 'undefined'
        ? Number(timeLimit1dMinutes)
        : 0;
    const total1d = DateHelper.hoursMinutesToSeconds(hours1d, minutes1d);
    const hours1m =
      typeof timeLimit1mHours !== 'undefined' ? Number(timeLimit1mHours) : 0;
    const minutes1m =
      typeof timeLimit1mMinutes !== 'undefined'
        ? Number(timeLimit1mMinutes)
        : 0;
    const total1m = DateHelper.hoursMinutesToSeconds(hours1m, minutes1m);

    return !(total1d > total1m);
  }

  static isBalanceDailyGreaterThanMonthly(formFields: any): boolean {
    const { balanceLimit1d, balanceLimit1m } = formFields;

    return !(balanceLimit1d > balanceLimit1m);
  }

  static getPasswordRequirements(state: AppStateShape): PasswordSettingsShape {
    return {
      passwordMinLength: state.systemSettings.passwordMinLength,
      passwordMinNumberOfDigits: state.systemSettings.passwordMinNumberOfDigits,
      passwordMinNumberOfLowerCaseCharacters:
        state.systemSettings.passwordMinNumberOfLowerCaseCharacters,
      passwordMinNumberOfSpecialCharacters:
        state.systemSettings.passwordMinNumberOfSpecialCharacters,
      passwordMinNumberOfUpperCaseCharacters:
        state.systemSettings.passwordMinNumberOfUpperCaseCharacters
    };
  }

  static birthDatePesel(formFields: any): boolean {
    const { birthYear, birthMonth, birthDay, pesel } = formFields;
    if (
      typeof birthDay !== 'undefined' &&
      typeof birthMonth !== 'undefined' &&
      typeof birthYear !== 'undefined' &&
      typeof pesel !== 'undefined' &&
      this.isValidPesel(pesel)
    ) {
      if (
        (birthDay.length === 2 && birthMonth.length === 2,
        birthYear.length === 4)
      ) {
        const peselDate = DateHelper.getDateFromPesel(pesel);
        return (
          peselDate.peselDay === Number(birthDay) &&
          peselDate.peselMonth === Number(birthMonth) &&
          peselDate.peselYear === Number(birthYear)
        );
      }
    }
    return true;
  }

  static isIdDocumentNumberValid(num: string): boolean {
    // Check length
    if (!num || num.length !== 9) {
      return false;
    }

    const upperNum = num.toUpperCase();
    const letterValues = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ];

    const getLetterValue = (letter: string) => {
      for (let j = 0, max = letterValues.length; j < max; j++) {
        if (letter === letterValues[j]) {
          return j;
        }
      }
      return -1;
    };

    // check series
    for (let i = 0; i < 3; i++) {
      if (getLetterValue(upperNum[i]) < 10) {
        return false;
      }
    }
    // check number
    for (let i = 3; i < 9; i++) {
      if (getLetterValue(upperNum[i]) < 0 || getLetterValue(upperNum[i]) > 9) {
        return false;
      }
    }

    // checksum
    let sum =
      7 * getLetterValue(upperNum[0]) +
      3 * getLetterValue(upperNum[1]) +
      1 * getLetterValue(upperNum[2]) +
      7 * getLetterValue(upperNum[4]) +
      3 * getLetterValue(upperNum[5]) +
      1 * getLetterValue(upperNum[6]) +
      7 * getLetterValue(upperNum[7]) +
      3 * getLetterValue(upperNum[8]);

    sum %= 10;

    if (sum !== getLetterValue(upperNum[3])) {
      return false;
    }

    return true;
  }

  static mapNationality(nationality: string): string {
    const mappedNationality = nationality === 'Polskie' ? 'PL' : nationality;
    return mappedNationality;
  }
}

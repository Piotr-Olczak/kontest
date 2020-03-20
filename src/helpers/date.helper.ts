export class DateHelper {
  static hour = 1000 * 60 * 60;
  static formatDateTime(date: Date): string {
    const hours = DateHelper.parseToTwoDigit(date.getHours());
    const minutes = DateHelper.parseToTwoDigit(date.getMinutes());
    const seconds = DateHelper.parseToTwoDigit(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }

  static formatDateTimeHours(date: Date): string {
    const hours = DateHelper.parseToTwoDigit(date.getHours());
    const minutes = DateHelper.parseToTwoDigit(date.getMinutes());
    return `${hours}:${minutes}`;
  }

  static formatSecondsToMonthDay(dateSeconds: number): string {
    const date = new Date(dateSeconds);
    const month = DateHelper.parseToTwoDigit(date.getMonth() + 1);
    const day = DateHelper.parseToTwoDigit(date.getDate());
    return `${day}.${month}`;
  }

  static formatDateFriendly(date?: Date): string {
    if (!date) date = new Date();
    return new Intl.DateTimeFormat('pl-PL').format(date);
  }

  static formatDateFull(date: Date): string {
    const days = DateHelper.formatDateFriendly(date);
    const time = DateHelper.formatDateTimeHours(date);
    return `${days} ${time}`;
  }

  static formatDateDetailed(
    date: Date,
    options?: Intl.DateTimeFormatOptions
  ): string {
    return new Intl.DateTimeFormat('pl-PL', options).format(date);
  }

  static parseToTwoDigit(num: number): string {
    if (num < 10) return `0${num}`;
    return num.toString();
  }

  static secondsToHoursMinutes(seconds: number): string {
    var hours = Math.floor(seconds / (60 * 60));

    var divisorForMinutes = seconds % (60 * 60);
    var minutes = Math.floor(divisorForMinutes / 60);

    return `${hours} godz. ${minutes} min`;
  }

  static hoursMinutesToSeconds(hours: number, minutes: number): number {
    const hoursInSeconds = hours * 60 * 60;
    const minutesInSeconds = minutes * 60;
    const totalSeconds = hoursInSeconds + minutesInSeconds;
    return totalSeconds;
  }

  static getDateForPoland(date: Date): Date {
    // modify date from UTC to UTC + 1
    return new Date(date.getTime() + DateHelper.hour);
  }

  static calculateAge(birthday: Date) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  static getDateFromPesel(pesel: string) {
    const peselMonthOffseted: number = Number(pesel.toString().substring(2, 4));
    const peselYearOffseted = Number(pesel.toString().substring(0, 2));
    const peselDay = Number(pesel.toString().substring(4, 6));

    let monthOffset = 0;
    let century = 19;

    if (peselMonthOffseted >= 20 && peselMonthOffseted < 40) {
      century = 20;
      monthOffset = 20;
    } else if (peselMonthOffseted >= 40 && peselMonthOffseted < 60) {
      century = 21;
      monthOffset = 40;
    } else if (peselMonthOffseted >= 60 && peselMonthOffseted < 80) {
      century = 22;
      monthOffset = 60;
    } else if (peselMonthOffseted >= 80 && peselMonthOffseted < 99) {
      century = 18;
      monthOffset = 80;
    } else {
      century = 19;
      monthOffset = 0;
    }

    const peselMonth = peselMonthOffseted - monthOffset;
    const peselYear = Number(
      century.toString() + this.parseToTwoDigit(peselYearOffseted)
    );

    return {
      peselDay,
      peselMonth,
      peselYear
    };
  }
}

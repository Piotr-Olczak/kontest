import { apiGetData, apiPostData } from 'helpers/apiConnector';
import { DateHelper } from 'helpers/date.helper';
import { PlayerAccountData } from 'interfaces/player/player';

class AuthHelper {
  static sessionKey = 'user';
  static sessionTimestampKey = 'loggedOn';

  login(login: string, password: string): Promise<any> {
    return apiPostData('/player/account/authenticate', {
      userName: login,
      password: password
    }).then((data: PlayerAccountData) => {
      this.setUserSession(data);
      this.setUserLoginTime();
      return data;
    });
  }

  logout(): Promise<any> {
    this.removeUserSessionData();

    return apiGetData('/player/account/logout');
  }

  setUserLoginTime() {
    window.sessionStorage.setItem(
      AuthHelper.sessionTimestampKey,
      new Date().getTime().toString()
    );
  }

  removeUserSessionData() {
    this.removeUserSession();
    this.removeUserLoginTime();
  }

  removeUserLoginTime() {
    window.sessionStorage.removeItem(AuthHelper.sessionTimestampKey);
  }

  getUserLoginTime(): Date {
    const sessionDate = window.sessionStorage.getItem(
      AuthHelper.sessionTimestampKey
    );

    if (sessionDate) {
      return DateHelper.getDateForPoland(new Date(Number(sessionDate)));
    }

    return new Date();
  }

  setUserSession(userData: PlayerAccountData): void {
    window.sessionStorage.setItem(
      AuthHelper.sessionKey,
      JSON.stringify(userData)
    );
  }

  removeUserSession(): void {
    window.sessionStorage.removeItem(AuthHelper.sessionKey);
  }

  getUserSession(): string | null {
    try {
      const sessionValue = window.sessionStorage.getItem(AuthHelper.sessionKey);
      return JSON.parse(sessionValue ? sessionValue : '');
    } catch (e) {
      return null;
    }
  }
}

export const authHelper = new AuthHelper();

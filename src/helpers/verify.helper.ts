import { apiGetData } from 'helpers/apiConnector';

class VerifyHelper {
  getAccess(): Promise<any> {
    return apiGetData('player/account/get-identt-session-data');
  }
}

export const verifyHelper = new VerifyHelper();

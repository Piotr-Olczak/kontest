import { apiGetData } from 'helpers/apiConnector';
import { PlayerDynamicData } from 'interfaces/player/player';

export class DynamicData {
  static getDynamicData(): Promise<PlayerDynamicData> {
    const dynamicDataEndpoint = '/player/account/get-account-dynamic-data';
    return apiGetData(dynamicDataEndpoint);
  }

  static updateUserDynamicData(dispatch: Function): void {
    this.getDynamicData().then(dynamicDataResponse => {
      dispatch({
        type: 'updateUserDynamicData',
        payload: dynamicDataResponse
      });
    });
  }
}

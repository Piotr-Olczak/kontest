import { apiRequest } from 'helpers/apiConnector';
import { AxiosResponse } from 'axios';

const urlHowToPlay = process.env.REACT_APP_CMS_API_URL + '/how-to-play';
const urlRaces = process.env.REACT_APP_CMS_API_URL + '/races';

const getHowToPlayDataRequestConfig = {
  url: urlHowToPlay,
  method: 'GET',
  withCredentials: false
};

const getProgramListDataRequestConfig = {
  url: urlRaces,
  method: 'GET',
  withCredentials: false
};

class CmsDataHelper {
  getContentHowToPlay(): Promise<void | AxiosResponse> {
    return apiRequest(getHowToPlayDataRequestConfig);
  }

  getContentRaces(): Promise<void | AxiosResponse> {
    return apiRequest(getProgramListDataRequestConfig);
  }
}

export const cmsDataHelper = new CmsDataHelper();

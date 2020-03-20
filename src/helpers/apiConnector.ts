import Axios from 'axios';
import { RequestObject } from 'interfaces/interfaces';

const apiUrl = process.env.REACT_APP_API_URL;

const axiosCommonConfig = {
  withCredentials: true
};

export const axios =
  typeof apiUrl === 'undefined'
    ? Axios.create(axiosCommonConfig)
    : Axios.create(Object.assign({}, axiosCommonConfig, { baseURL: apiUrl }));

/**
 * Custom API call
 *
 * @param {Object} requestObject
 */
export const apiRequest = (requestObject: RequestObject) => {
  const axiosRequestConfig = {
    url: requestObject.url ? requestObject.url : undefined,
    method: requestObject.method ? requestObject.method : undefined,
    headers: requestObject.headers ? requestObject.headers : undefined,
    data: requestObject.data ? requestObject.data : undefined
  };
  return axios(axiosRequestConfig)
    .then(response => response)
    .catch(function(error) {
      console.error(error);
    });
};

/**
 * Get data from API
 *
 * @param {string} endpoint API endpoint
 * @param {function} callback Callback that transforms response.data
 *
 * @returns Response data
 */
export const apiGetData = (
  endpoint: string,
  callback?: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  return axios(endpoint)
    .then(response => (callback ? callback(response.data) : response.data))
    .catch(function(error) {
      // Print error to console and notify StatusHandler about API recieving Error
      console.error(error);
      if (errorCallback) errorCallback(error);

      throw error;
    });
};

/**
 * Post data to API
 *
 * @param {string} endpoint API endpoint
 * @param {Object} payload Data (JSON) to send
 * @param {function} callback
 */
export const apiPostData = (
  endpoint: string,
  payload: Object,
  callback?: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  return axios({
    method: 'POST',
    url: endpoint,
    data: payload,
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then(response => (callback ? callback(response.data) : response.data))
    .catch(error => {
      // Print post error to console and notify StatusHandler about API sending Error
      console.error(error);
      if (errorCallback) errorCallback(error);

      throw error;
    });
};

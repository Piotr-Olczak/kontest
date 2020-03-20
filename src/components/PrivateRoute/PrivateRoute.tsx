import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AppContext } from 'components/AppState/AppState';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { APP_URLS } from 'helpers/url.helper';
import { AppContextShape } from 'interfaces/interfaces';
import { PrivateRouteProps } from 'interfaces/routes/routes';
import { authHelper } from 'helpers/auth.helper';
import { userHelper } from 'helpers/user.helper';
import { axios } from 'helpers/apiConnector';

const Loading = () => <LoadingScreen />;

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { state, dispatch } = useContext<AppContextShape>(AppContext);
  const userSession = window.sessionStorage.getItem('user');

  const fetchAccountData = () => {
    return userHelper
      .getAccountData()
      .then(data => {
        dispatch({
          type: 'setUserDetailsAndAuth',
          payload: {
            auth: true,
            details: data
          }
        });
      })
      .catch(error => {
        dispatch({
          type: 'setUserDetailsAndAuth',
          payload: {
            auth: false
          }
        });

        authHelper.removeUserSessionData();
        setNeedsAccountData(false);
      });
  };

  const [needsAccountData, setNeedsAccountData] = useState(
    !!userSession && !state.user.isAuth
  );

  useEffect(() => {
    if (needsAccountData) {
      fetchAccountData().then(() => {
        setNeedsAccountData(false);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (needsAccountData) {
    return <Loading />;
  }

  // Intercept every response and redirect to login if session expired
  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
        dispatch({
          type: 'setUserSessionExpired'
        });

        authHelper.removeUserSessionData();
        setNeedsAccountData(false);
      }

      throw error;
    }
  );

  return (
    <Route
      {...rest}
      render={props =>
        state.user.isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={APP_URLS.login} />
        )
      }
    />
  );
};

export default PrivateRoute;

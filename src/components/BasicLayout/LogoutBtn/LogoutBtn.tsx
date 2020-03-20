import React, { useState, useContext } from 'react';
import LogoutIcon from './power-button-off.svg';
import { authHelper } from 'helpers/auth.helper';
import { AppContext } from 'components/AppState/AppState';
import { AppContextShape } from 'interfaces/interfaces';

export const LogoutBtn = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { dispatch } = useContext<AppContextShape>(AppContext);

  const handleClick = () => {
    setIsLoggingOut(true);

    authHelper.logout().then(data => {
      dispatch({
        type: 'setUserDetailsAndAuth',
        payload: {
          auth: false
        }
      });
    });
  };

  return (
    <button
      className={'logout-btn'}
      disabled={isLoggingOut}
      onClick={handleClick}
    >
      <img src={LogoutIcon} alt="" />
      {isLoggingOut ? 'Wylogowuję...' : 'Wyloguj'}
    </button>
  );
};

import React, { useContext } from 'react';
import { userHelper } from 'helpers/user.helper';
import { AppContextShape } from 'interfaces/interfaces';
import { AppContext } from 'components/AppState/AppState';
import { ContentBlocked } from 'components/ContentBlocked/ContentBlocked';

export const Protected: React.FC = props => {
  const { children } = props;
  const { state } = useContext<AppContextShape>(AppContext);
  const userFullAccess = userHelper.isUserFullAccess(state);

  return userFullAccess ? <>{children}</> : <ContentBlocked />;
};

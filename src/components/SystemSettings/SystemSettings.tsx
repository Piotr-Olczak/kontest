import { AppContext } from 'components/AppState/AppState';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { systemSettingsHelper } from 'helpers/systemSettings.helper';

import { SystemSettingsShape } from 'interfaces/interfaces';
import React, { useContext, useEffect, useState } from 'react';

const SystemSettings: React.FC = ({ children }) => {
  const { state, dispatch } = useContext(AppContext);
  const [hasErrors, setHasError] = useState(false);

  // fetch system settings
  useEffect(() => {
    systemSettingsHelper.fetchSystemSettings().then(
      (data: SystemSettingsShape) => {
        if (!data) {
          setHasError(true);
        } else {
          dispatch({
            type: 'setSystemSettings',
            payload: data
          });
        }
      },
      error => setHasError(true)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [1]);

  if (hasErrors)
    return <h1>Przykro nam, wystąpił błąd. Proszę spróbować później.</h1>;

  return (
    <React.Fragment>
      {state.systemSettings && Object.keys(state.systemSettings).length ? (
        <React.Fragment>{children}</React.Fragment>
      ) : (
        <LoadingScreen />
      )}
    </React.Fragment>
  );
};

export default SystemSettings;

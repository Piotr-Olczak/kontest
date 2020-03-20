import { AppContext } from 'components/AppState/AppState';
import { Container } from 'components/Container/Container';
import { Timer } from 'components/Timer/Timer';
import { authHelper } from 'helpers/auth.helper';
import { APP_URLS } from 'helpers/url.helper';
import { userHelper } from 'helpers/user.helper';
import { formatPrice } from 'helpers/utils';
import { AppContextShape } from 'interfaces/interfaces';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

export const SubHeader: React.FC = () => {
  const { state } = useContext<AppContextShape>(AppContext);

  const clockTime = userHelper.getServerTimeFromState(state);
  const timerDate = authHelper.getUserLoginTime();

  return (
    <header className={'subheader'}>
      <Container className="subheader__wrapper">
        <div className="subheader__timers">
          <Timer type="clock" from={clockTime} label="Godzina" />
          <Timer type="timer" from={timerDate} label="Online" />
        </div>

        <div className="subheader__account">
          {state.user.details && (
            <p>
              Stan portfela:{' '}
              <strong>
                {formatPrice(state.user.details.dynamicData.currentBalance)}
              </strong>
            </p>
          )}
          <Link to={APP_URLS.deposit} className="btn btn--full">
            Dodaj środki
          </Link>
        </div>
      </Container>
    </header>
  );
};

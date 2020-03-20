import LoginHeader from 'components/Login/LoginHeader/LoginHeader';
import { UniversalWrapper } from 'components/UniversalWrapper/UniversalWrapper';

import { apiGetData } from 'helpers/apiConnector';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

const UnlockAccountPage: React.FC<RouteComponentProps> = ({
  location
}: RouteComponentProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const search = queryString.parse(location.search);

    if (search.token) {
      var params = {
        token: search.token
      };

      apiGetData(
        `/player-public/unlock-invalid-player-login?${queryString.stringify(
          params
        )}`,
        data => {
          setIsLoading(false);
          setIsConfirmed(true);
          setError('');
        },
        error => {
          setIsLoading(false);
          setIsConfirmed(false);
          setError('Ten token wygasł lub coś poszło nie tak.');
        }
      );
    } else {
      setIsLoading(false);
      setIsConfirmed(false);
      setError(
        'Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się z nami.'
      );
    }
  }, [location]);

  return (
    <UniversalWrapper>
      <LoginHeader>
        <h2>Odblokuj konto</h2>
      </LoginHeader>

      {isLoading && <p>Trwa odblokowywanie konta...</p>}
      {isConfirmed && (
        <div>
          <p>Twoje konto zostało odblokowane.</p>
          <div className="form-block">
            <Link className="btn" to="/zaloguj">
              Przejdź do logowania
            </Link>
          </div>
        </div>
      )}
      {error && (
        <div className="form-status form-status--error">
          <p>{error}</p>
          <div className="form-block">
            <Link className="btn" to="/">
              Wróć
            </Link>
          </div>
        </div>
      )}
    </UniversalWrapper>
  );
};

export default UnlockAccountPage;

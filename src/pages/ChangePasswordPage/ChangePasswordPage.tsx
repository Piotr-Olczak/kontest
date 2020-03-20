import LoginHeader from 'components/Login/LoginHeader/LoginHeader';
import { UniversalWrapper } from 'components/UniversalWrapper/UniversalWrapper';

import { apiGetData } from 'helpers/apiConnector';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

const ChangePasswordPage: React.FC<RouteComponentProps> = ({
  location
}: RouteComponentProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const search = queryString.parse(location.search);

    if (search.changePasswordToken) {
      var params = {
        changePasswordToken: search.changePasswordToken
      };

      apiGetData(
        `/player-public/confirm-change-password-request?${queryString.stringify(
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
        'Coś poszło nie tak. Jeśli próbujesz zmienić hasło skontaktuj się z nami.'
      );
    }
  }, [location]);

  return (
    <UniversalWrapper>
      <LoginHeader>
        <h2>Tworzenie nowego hasła</h2>
      </LoginHeader>

      {isLoading && <p>Trwa tworzenie nowego hasła...</p>}
      {isConfirmed && (
        <div>
          <p>
            Przejdź do poczty e-mail - powinieneś już otrzymać tymczasowe hasło,
            które umożliwi Ci zalogowanie się
          </p>
          <p>Sprawdź swoją skrzynkę i zaloguj się z użyciem nowego hasła.</p>
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

export default ChangePasswordPage;

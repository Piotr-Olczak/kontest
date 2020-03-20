import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import { apiGetData } from 'helpers/apiConnector';
import LoginHeader from 'components/Login/LoginHeader/LoginHeader';
import { UniversalWrapper } from 'components/UniversalWrapper/UniversalWrapper';

const ConfirmEmailPage: React.FC<RouteComponentProps> = ({
  location
}: RouteComponentProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const search = queryString.parse(location.search);

    if (search.mailVerificationToken) {
      var params = {
        mailVerificationToken: search.mailVerificationToken
      };

      apiGetData(
        `/player-public/verify-email-address?${queryString.stringify(params)}`,
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
        <h2>Weryfikacja adresu email</h2>
      </LoginHeader>

      {isLoading && <p>Trwa weryfikowanie adresu email...</p>}
      {isConfirmed && (
        <div>
          <p>Twoje konto zostało zweryfikowane.</p>
          <p>Możesz się teraz zalogować.</p>
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

export default ConfirmEmailPage;

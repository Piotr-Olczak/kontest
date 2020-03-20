import React from 'react';
import { Link } from 'react-router-dom';
import { APP_URLS } from 'helpers/url.helper';

const RegisterConfirmationPage: React.FC = () => {
  return (
    <div className="register-confirmation">
      <div className="register-success">
        <h2>Potwierdzenie rejestracji</h2>
        <p>
          <strong>Dziękujemy za zarejstrowanie konta!</strong> Sprawdź maila aby
          potwierdzić rejestrację, a następnie przejdź do formularza logowania.
        </p>
        <div className="register-confirmation__navigation">
          <Link to={APP_URLS.login} className="btn btn--full">
            Przejdź do logowania
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RegisterConfirmationPage;

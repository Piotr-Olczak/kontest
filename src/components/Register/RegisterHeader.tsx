import React from 'react';
import RegisterSteps from 'components/Register/RegisterSteps';
import { RegisterHeaderShape } from 'interfaces/register/register';
import { Link } from 'react-router-dom';
import { APP_URLS } from 'helpers/url.helper';

import { ReactComponent as Logo } from 'assets/svg/logo-traf.svg';

const RegisterHeader: React.FC<RegisterHeaderShape> = props => {
  const currentStep = props.currentStep;
  return (
    <div className="register-header">
      <Link to={APP_URLS.login} className="register-header__logo-wrapper">
        <Logo className="register-header__logo" />
      </Link>
      <div className="register-header__login">
        <p className="register-header__login-text">
          Posiadasz już Konto <span>na naszym serwisie</span>?
        </p>
        <Link to={APP_URLS.login} className="register-header__login-button btn">
          Zaloguj się
        </Link>
      </div>
      <div className="register-header__content">
        <p className="register-header__content-main">
          Tylko pięć minut dzieli Cię od świata wyścigów konnych online.
        </p>
        <p className="register-header__content-extra">
          Wypełnij formularz rejestracyjny i poczuj emocje jakie daje ten
          szlachetny sport.
          <br />
          <br />
          Teraz możesz wygodnie grać wszędzie gdzie tylko chcesz.
        </p>
      </div>
      <RegisterSteps currentStep={currentStep} />
    </div>
  );
};

export default RegisterHeader;

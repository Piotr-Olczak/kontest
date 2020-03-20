import React from 'react';
import { ReactComponent as Logo } from 'assets/svg/logo-traf.svg';
import { Link } from 'react-router-dom';
import { APP_URLS } from 'helpers/url.helper';

const LoginForm: React.FC = ({ children }) => {
  return (
    <div className="login-header">
      <Link to="/" className="login-header__logo-wrapper">
        <Logo className="login-header__logo" />
      </Link>
      <div className="login-header__register">
        <p className="login-header__register-text">
          Nie posiadasz konta <span> w trafonline</span>?
        </p>
        <Link
          to={APP_URLS.register}
          className="login-header__register-button btn"
        >
          Zarejestruj się
        </Link>
      </div>

      <div className="login-header__content-wrapper">{children}</div>
    </div>
  );
};

export default LoginForm;

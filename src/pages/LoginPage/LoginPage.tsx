import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router';
// @ts-ignore
import PWAPrompt from 'react-ios-pwa-prompt';
import LoginHeader from 'components/Login/LoginHeader/LoginHeader';
import LoginForm from 'components/Login/LoginForm/LoginForm';
import LoginBlend from 'components/Login/LoginBlend/LoginBlend';
import { AppContext } from 'components/AppState/AppState';
import { AppContextShape } from 'interfaces/interfaces';

const LoginPage: React.FC<RouteComponentProps> = props => {
  const { state } = useContext<AppContextShape>(AppContext);
  return (
    <div className="login-page-wrapper">
      <div className="login-wrapper">
        <LoginHeader>
          <div>
            <h2>Witamy w świecie wyścigów konnych online!</h2>
            <p>Zaloguj się</p>
            {state.user.sessionExpired && (
              <div className="form-status form-status--error">
                Twoja sesja wygasła.
              </div>
            )}
          </div>
        </LoginHeader>
        <LoginForm />
      </div>
      <div className="login-blend-wrapper">
        <LoginBlend />
      </div>
      <PWAPrompt
        timesToShow={1}
        copyTitle="Dodaj do ekranu głównego"
        copyBody="Serwis Traf Online posiada funkcjonalność aplikacji mobilnej. Dodaj go do ekranu głównego aby uzyskać jeszcze szybszy dostęp do serwisu."
        copyAddHomeButtonLabel={`2) Dodaj do ekranu głównego`}
        copyShareButtonLabel={`1) Użyj przycisku "Udostępnij"`}
        copyClosePrompt="Kasuj"
      />
    </div>
  );
};

export default LoginPage;

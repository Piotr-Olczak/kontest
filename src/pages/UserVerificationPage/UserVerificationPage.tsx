import React, { useEffect, useState, useContext } from 'react';
import BasicLayout from 'components/BasicLayout/BasicLayout';
import { SettingsPageLayout } from 'components/SettingsPageLayout/SettingsPageLayout';
import { verifyHelper } from 'helpers/verify.helper';
import CommonError from 'components/CommonError/CommonError';
import { AppContextShape } from 'interfaces/interfaces';
import { AppContext } from 'components/AppState/AppState';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { DelayedRedirect } from 'components/DelayedRedirect/DelayedRedirect';
import { userHelper } from 'helpers/user.helper';
import { PlayerAccountStatus } from 'interfaces/player/player';
import { APP_URLS } from 'helpers/url.helper';
import { FaqElementShape } from 'interfaces/FaqElement/FaqElement';

const USER_VERIFICATION_FAQ: FaqElementShape[] = [
  {
    id: 1,
    title: 'Czym jest nieaktywne Konto Gracza?',
    description:
      'Konto Gracza nieaktywne to Konto które zostało założene przez Gracza, ale proces rejestracji nie został zakończony. Gracz może się zalogować, nie może jednal zasilać portfela i obstawiać zakładów. Pełna funkcjonalność Konta jest dostępna dla Graczy, którzy zeskanowali swój dowód osobisty.'
  },
  {
    id: 2,
    title: 'Ile trwa weryfikacja konta gracza?',
    description:
      'Pełny proces weryfikacji konta gracza po przesłaniu poprawnych skanów dokumentów trwa do 15 minut. O ukończeniu procesu weryfikacji Gracz informowany komunikatem na stronie serwisu.'
  }
];

interface IdenttParamsShape {
  session_id: string;
  document_id: string;
  pcode: string;
}

export const UserVerificationPage: React.FC = props => {
  const [accessData, setAccessData] = useState();
  const [error, setError] = useState();

  const { state } = useContext<AppContextShape>(AppContext);
  const [gotResponse, setGotResponse] = useState(false);
  const pcode =
    state.user && state.user.details && state.user.details.pcode
      ? state.user.details.pcode
      : '';

  useEffect(() => {
    verifyHelper
      .getAccess()
      .then(data => {
        const params: IdenttParamsShape = {
          session_id: data.session_id,
          document_id: data.document_id,
          pcode
        };

        setAccessData(params);
      })
      .catch(error => {
        setError(true);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PostMessageHandler = (e: MessageEvent) => {
    const { origin, data } = e;

    if (
      origin === process.env.REACT_APP_VERIFY_FRAMEWORK_ORIGIN &&
      data === pcode
    ) {
      setGotResponse(true);
    }
  };

  useEffect(() => {
    window.addEventListener('message', PostMessageHandler);

    return () => {
      window.removeEventListener('message', PostMessageHandler);
    };
  });

  const currentStatus = state.user.details
    ? state.user.details.accountStatus
    : 'CONFIRMED';

  return (
    <BasicLayout>
      <SettingsPageLayout
        icon={'secure'}
        pageTitle="Weryfikacja konta"
        faqElements={USER_VERIFICATION_FAQ}
      >
        {error && <CommonError />}

        {gotResponse && (
          <VerificationStatusChecker currentStatus={currentStatus} />
        )}
        {!gotResponse && accessData && <IdenttIframe params={accessData} />}
      </SettingsPageLayout>
    </BasicLayout>
  );
};

interface VerificationStatusCheckerPropsShape {
  currentStatus: PlayerAccountStatus;
}

const VerificationStatusChecker: React.FC<
  VerificationStatusCheckerPropsShape
> = props => {
  const { dispatch } = useContext<AppContextShape>(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isAccountVerified, setIsAccountVerified] = useState(false);

  useEffect(() => {
    userHelper
      .getAccountData()
      .then(data => {
        const hasBeenVerified =
          props.currentStatus !== data.accountStatus &&
          data.accountStatus === 'ACTIVE';

        setIsAccountVerified(hasBeenVerified);

        if (hasBeenVerified) {
          dispatch({
            type: 'setUserDetailsAndAuth',
            payload: {
              auth: true,
              details: data
            }
          });
        }
      })
      .catch(error => setIsAccountVerified(false))
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Proces weryfikacji zakończony</h2>
      {isLoading && <LoadingScreen />}

      {!isLoading && (
        <>
          {isAccountVerified && (
            <div>
              <p className="form-status form-status--success">
                Twoje konto zostało zweryfikowane
              </p>
              <DelayedRedirect delay={2000} url={APP_URLS.racesList} />
            </div>
          )}
          {!isAccountVerified && (
            <p className="form-status form-status--error">
              Twoje konto nie zostało zweryfikowane. Spróbuj ponownie lub
              skontaktuj się z nami.
            </p>
          )}
        </>
      )}
    </div>
  );
};

interface IdenttIframePropsShape {
  params: IdenttParamsShape;
}

const IdenttIframe: React.FC<IdenttIframePropsShape> = props => {
  const queryParams = new URLSearchParams({ ...props.params });
  return (
    <iframe
      title="Weryfikacja dowodu osobistego"
      allow="camera"
      style={{
        width: '100%',
        height: '1000px',
        border: 0
      }}
      src={`${
        process.env.REACT_APP_VERIFY_FRAMEWORK_URL
      }?${queryParams.toString()}`}
    />
  );
};

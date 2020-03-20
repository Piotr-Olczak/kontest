import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContextShape } from 'interfaces/interfaces';
import { AppContext } from 'components/AppState/AppState';
import { APP_URLS } from 'helpers/url.helper';
import { userHelper } from 'helpers/user.helper';

const PoliticalNoSendForm: React.FC = () => {
  return (
    <section>
      <h3>Brak przesłanej deklaracji</h3>
      <p>
        Niniejsza funkcjonalność jest zablokowana dla osób pełniących
        eksponowane stanowisko polityczne, członków rodziny lub też osób znanych
        jako bliscy współpracownicy osób pełniących eksponowane stanowisko
        polityczne w myśl ustawy z dn. 1 marca 2018 r. o przeciwdziałaniu praniu
        pieniędzy oraz finansowaniu terroryzmu.
      </p>

      <p>
        Funkcjonalność zostanie odblokowana po otrzymaniu przez Totalizator
        Sportowy sp. z o.o. deklaracji przesłanej w wiadomości e-mail w trakcie
        procesu rejestracji konta.
      </p>
    </section>
  );
};

const NoIdenttVerification: React.FC = () => {
  return (
    <section>
      <h3>Niezweryfikowane konto</h3>
      <p>Funkcjonalność zablokowana dla niezweryfikowanych kont.</p>
      <p>
        {' '}
        Zweryfikuj konto <Link to={APP_URLS.userVerification}>tutaj</Link>.
      </p>
    </section>
  );
};

export const ContentBlocked: React.FC = () => {
  const { state } = useContext<AppContextShape>(AppContext);
  const isPoliticalClearToPlay = userHelper.isPoliticalClearToPlay(state);
  const isUserAccountActive = userHelper.isUserAccountActive(state);
  return (
    <>
      {!isPoliticalClearToPlay && <PoliticalNoSendForm />}
      {!isUserAccountActive && <NoIdenttVerification />}
    </>
  );
};

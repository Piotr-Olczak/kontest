import { Alert } from 'antd';
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import {
  Link,
  NavLink,
  withRouter,
  match,
  RouteComponentProps
} from 'react-router-dom';
import * as H from 'history';

import { AppContext } from 'components/AppState/AppState';
import { LogoutBtn } from 'components/BasicLayout/LogoutBtn/LogoutBtn';
import { MenuButton } from 'components/BasicLayout/MenuButton/MenuButton';
import { SubHeader } from 'components/BasicLayout/SubHeader/SubHeader';
import { Container } from 'components/Container/Container';
import { Icon } from 'components/Icon/Icon';
import { Logo } from 'components/Logo/Logo';
import { DateHelper } from 'helpers/date.helper';

import { APP_URLS, CONTENT_URLS } from 'helpers/url.helper';
import { userHelper } from 'helpers/user.helper';
import { AppContextShape } from 'interfaces/interfaces';
interface BasicLayoutShape extends RouteComponentProps {
  activeBackground?: boolean;
  extraClasses?: string;
}

export const BasicLayout: React.FC<BasicLayoutShape> = props => {
  const { state } = useContext(AppContext);
  const isUserAccountConfirmed = userHelper.isUserAccountConfirmed(state);
  const isPoliticalClearToPlay = userHelper.isPoliticalClearToPlay(state);

  let { activeBackground, extraClasses } = props;

  const sectionClassName = classNames(
    'basic-layout__content',
    {
      'basic-layout__content--horse-bg': activeBackground
    },
    extraClasses
  );

  return (
    <main className="basic-layout">
      <LayoutHeader />
      <SubHeader />
      <section className={sectionClassName}>
        <Container>
          {isUserAccountConfirmed &&
            props.location.pathname !== APP_URLS.userVerification && (
              <NotVerifiedAlert />
            )}
          {!isPoliticalClearToPlay && <NotClearPoliticallyAlert />}
          {props.children}
        </Container>
      </section>
      <LayoutFooter />
    </main>
  );
};

export const LayoutHeader: React.FC<{ showMenu?: boolean }> = props => {
  const { state } = useContext<AppContextShape>(AppContext);

  const [menuShow, toggleMenuShow] = useState(false);
  const handleMenuToggle = (isToggled: boolean) => {
    toggleMenuShow(isToggled);
  };

  const headerClasses = classNames({
    'basic-layout__header': true,
    'basic-layout__header--active': menuShow
  });

  return (
    <header className={headerClasses}>
      <Link to={APP_URLS.homepage} className="basic-layout__header__link">
        <figure className="basic-layout__header__logo">
          <Logo />
        </figure>
      </Link>

      {props.showMenu && (
        <>
          <nav className="basic-layout__header__navigation">
            <ul className="main-nav">
              <NavElement name={'Graj teraz!'} url={APP_URLS.racesList} />
              <NavElement name={'Program gonitw'} url={APP_URLS.program} />
              <NavElement
                name={'Prognozy wypłat'}
                url={APP_URLS.payoutForecasts}
              />
              <NavElement name={'Oglądaj na żywo'} url={APP_URLS.videoFeed} />
              <NavElement name={'Twoje zakłady'} url={APP_URLS.userBets} />
              <NavElement
                name={'Konto gracza'}
                url={APP_URLS.settings}
                extraClasses="user-account-nav--mobile"
              />
              <NavElement
                name={'Konto gracza'}
                url={APP_URLS.deposit}
                isActiveFn={(match, location) =>
                  location.pathname.includes(APP_URLS.settings)
                }
                extraClasses="user-account-nav--regular"
              />
              <NavElement name={'Jak grać?'} url={APP_URLS.playIntructions} />
            </ul>

            <div className="basic-layout__header__actions">
              <div className="basic-layout__header__user">
                {state.user.details && (
                  <p>
                    Witaj{' '}
                    <strong>{state.user.details.basicData.firstName}</strong>
                  </p>
                )}
              </div>
              <LogoutBtn />
            </div>
          </nav>

          <MenuButton onToggleChange={handleMenuToggle} />
        </>
      )}
    </header>
  );
};

LayoutHeader.defaultProps = {
  showMenu: true
};

const NavElement: React.FC<{
  name: string;
  url: string;
  extraClasses?: string;
  isActiveFn?<Params extends { [K in keyof Params]?: string }>(
    match: match<Params>,
    location: H.Location
  ): boolean;
}> = props => {
  const { url, name, isActiveFn, extraClasses } = props;

  const navElementClasses = classNames('main-nav__element', extraClasses);

  return (
    <li className={navElementClasses}>
      <NavLink
        activeClassName={'main-nav__element--active'}
        to={url}
        isActive={isActiveFn}
      >
        {name}{' '}
        <span className="icon">
          <Icon type={'right-arrow'} />
        </span>
      </NavLink>
    </li>
  );
};

export const LayoutFooter = () => {
  const { state } = useContext(AppContext);

  const lastValidLogin = userHelper.getLastValidTimeFromState(state);
  const lastInvalidLogin = userHelper.getLastInvalidTimeFromState(state);

  return (
    <footer className="basic-layout__footer">
      <Container>
        <ul className="menu-footer">
          <li className="menu-footer__item">
            <a
              href={CONTENT_URLS.privacyRegulations}
              className="link-external"
              target="_blank"
              rel="noopener noreferrer"
            >
              Polityka prywatności
            </a>
          </li>
          <li className="menu-footer__item">
            <a
              href={CONTENT_URLS.terms}
              className="link-external"
              target="_blank"
              rel="noopener noreferrer"
            >
              Regulaminy
            </a>
          </li>
          <li className="menu-footer__item">
            <a
              href={CONTENT_URLS.playerLimits}
              className="link-external"
              target="_blank"
              rel="noopener noreferrer"
            >
              Odpowiedzialna gra
            </a>
          </li>
          <li className="menu-footer__item">
            <a
              href={CONTENT_URLS.parentalControl}
              className="link-external"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kontrola rodzicielska
            </a>
          </li>
          <li className="menu-footer__item">
            <a
              href={CONTENT_URLS.contact}
              className="link-external"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kontakt
            </a>
          </li>
        </ul>

        <p>
          Właścicielem i operatorem strony internetowej www.trafonline.pl jest
          Traf – Zakłady Wzajemne spółka z ograniczoną odpowiedzialnością z
          siedzibą w Warszawie, adres: ul. Kijowska 1, 03 738 Warszawa, wpisana
          do rejestru przedsiębiorców Krajowego Rejestru Sądowego prowadzonego
          przez Sąd Rejonowy dla m.st. Warszawy w Warszawie, XIII Wydział
          Gospodarczy Krajowego Rejestru Sądowego pod Nr KRS 0000358998, NIP
          113-280-51-90, REGON: 142435268.
        </p>
        <p>
          Traf – Zakłady Wzajemne Sp. z o.o. działa na podstawie zezwolenia
          wydanego przez Ministra Finansów. Hazard związany jest z ryzykiem, a
          udział w nielegalnych grach hazardowych jest niezgodny z polskim
          prawem.
        </p>
        {lastValidLogin && (
          <p>
            Data ostatniego poprawnego logowania:{' '}
            {DateHelper.formatDateFull(lastValidLogin)}
          </p>
        )}
        {lastInvalidLogin && (
          <p>
            Data ostatniego niepoprawnego logowania:{' '}
            {DateHelper.formatDateFull(lastInvalidLogin)}
          </p>
        )}
      </Container>
    </footer>
  );
};

const NotVerifiedMsg = (
  <>
    Twoje konto nie jest w pełni zweryfikowane.{' '}
    <Link to={APP_URLS.userVerification}>
      {' '}
      Przejdź na stronę Ustawień Konta w celu potwierdzenia dowodu tożsamości.
    </Link>
  </>
);

const NotVerifiedAlert = () => {
  return (
    <Alert
      message="Niezweryfikowane konto"
      description={NotVerifiedMsg}
      type="warning"
      showIcon
    />
  );
};

const NoClearPoliticallydMsg = (
  <>
    <p>
      Niniejsza funkcjonalność jest zablokowana dla osób pełniących eksponowane
      stanowisko polityczne, członków rodziny lub też osób znanych jako bliscy
      współpracownicy osób pełniących eksponowane stanowisko polityczne w myśl
      ustawy z dn. 1 marca 2018 r. o przeciwdziałaniu praniu pieniędzy oraz
      finansowaniu terroryzmu.
    </p>
    <p>
      Funkcjonalność zostanie odblokowana po otrzymaniu przez Totalizator
      Sportowy sp. z o.o. deklaracji przesłanej w wiadomości e-mail w trakcie
      procesu rejestracji konta.
    </p>
  </>
);

const NotClearPoliticallyAlert = () => {
  return (
    <Alert
      message="Brak przesłanej deklaracji"
      description={NoClearPoliticallydMsg}
      type="warning"
      showIcon
    />
  );
};

export default withRouter(BasicLayout);

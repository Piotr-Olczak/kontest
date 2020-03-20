import classNames from 'classnames';
import { Icon, IconType } from 'components/Icon/Icon';
import { SettingsFaq } from 'components/SettingsPageLayout/SettingsFaq/SettingsFaq';
import { APP_URLS } from 'helpers/url.helper';
import { FaqElementShape } from 'interfaces/FaqElement/FaqElement';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LinkBackToRaces } from 'components/LinkBackToRaces/LinkBackToRaces';

interface SettingsPageLayoutShape {
  pageTitle: string;
  faqElements?: FaqElementShape[];
  icon?: IconType;
  isMainSettingsPage?: boolean;
}

export const SettingsPageLayout: React.FC<SettingsPageLayoutShape> = props => {
  const { pageTitle, faqElements, icon, isMainSettingsPage } = props;

  const sectionClasses = classNames({
    settings: true,
    'settings--main': isMainSettingsPage
  });

  return (
    <section className={sectionClasses}>
      {!isMainSettingsPage && (
        <Link className="settings__mobile-nav" to={APP_URLS.settings}>
          {'<<'} Ustawienia
        </Link>
      )}
      <SettingsPanel />
      {!isMainSettingsPage && (
        <SettingsBody
          pageTitle={pageTitle}
          faqElements={faqElements}
          icon={icon}
        >
          {props.children}
        </SettingsBody>
      )}
    </section>
  );
};

const SettingsPanel: React.FC = () => {
  return (
    <aside className="settings__panel">
      <LinkBackToRaces />
      <h2>Ustawienia konta</h2>
      <nav className="settings-nav">
        <ul className="settings-nav__list">
          <NavItem url={APP_URLS.deposit} icon={'deposit'}>
            Depozyt
          </NavItem>
          <NavItem url={APP_URLS.withdraw} icon={'withdraw'}>
            Wypłata
          </NavItem>
          <NavItem url={APP_URLS.transactions} icon={'refresh'}>
            Transakcje
          </NavItem>
          <NavItem url={APP_URLS.userSettings} icon={'settings'}>
            Ustawienia konta
          </NavItem>
          <NavItem url={APP_URLS.responsibleGame} icon={'blocked-screen'}>
            Odpowiedzialna gra
          </NavItem>
          <NavItem url={APP_URLS.contact} icon={'contact'}>
            Kanały kontaktu
          </NavItem>
          <NavItem url={APP_URLS.userVerification} icon={'secure'}>
            Weryfikacja konta
          </NavItem>
        </ul>
      </nav>
    </aside>
  );
};

const NavItem: React.FC<{ icon?: IconType; url: string }> = props => {
  const { icon, url, children } = props;
  return (
    <li className="settings-nav__element">
      <NavLink activeClassName="settings-nav__element--active" to={url}>
        {icon && <Icon type={icon} />}
        <span>{children}</span>
        <Icon className="settings-nav__arrow" type={'right-arrow'} />
      </NavLink>
    </li>
  );
};

const SettingsBody: React.FC<SettingsPageLayoutShape> = props => {
  let { pageTitle, faqElements, icon } = props;
  if (!faqElements) faqElements = [];
  return (
    <article className="settings-body">
      <section className="settings-body__content">
        <h3 className="settings-body__header">
          {icon && <Icon type={icon} />}
          {pageTitle}
        </h3>
        <div className="settings-content">{props.children}</div>
      </section>
      {!!faqElements.length && (
        <aside className="settings-faq-list">
          <header>
            <h4 className="settings-faq-list__title">
              <Icon type="question" /> Pytania i odpowiedzi
            </h4>
          </header>
          <section>
            {faqElements.map((faq: FaqElementShape) => (
              <SettingsFaq faq={faq} key={faq.id} />
            ))}
          </section>
        </aside>
      )}
    </article>
  );
};

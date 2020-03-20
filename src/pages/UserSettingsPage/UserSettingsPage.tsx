import React from 'react';
import BasicLayout from 'components/BasicLayout/BasicLayout';
import { SettingsPageLayout } from 'components/SettingsPageLayout/SettingsPageLayout';
import EditPlayerData from 'components/EditPlayerData/EditPlayerData';
import { FaqElementShape } from 'interfaces/FaqElement/FaqElement';

const USER_SETTINGS_FAQ: FaqElementShape[] = [
  {
    id: 1,
    title:
      'Dlaczego muszę podać swoje dane osobowe? Czy moje dane są bezpieczne?',
    description:
      'Podanie danych osobowych w procesie rejestracji w trafonline.pl jest wymagane i wynika z zapisów Ustawy z dnia 19 listopada 2009 r. o grach hazardowych. Przed przystąpieniem do udziału w grze jesteśmy zobowiązani do zweryfikowania Twojej tożsamości. Podanie danych jest dobrowolne, jednak brak rejestracji uniemożliwi Ci korzystanie w pełni z serwisu. Dokładamy wszelkich starań, aby zachować najwyższe standardy bezpieczeństwa, w trosce o ochronę Twoich danych osobowych.'
  }
];

export const UserSettingsPage: React.FC = props => {
  return (
    <BasicLayout>
      <SettingsPageLayout
        icon={'settings'}
        pageTitle="Ustawienia konta"
        faqElements={USER_SETTINGS_FAQ}
      >
        <EditPlayerData />
      </SettingsPageLayout>
    </BasicLayout>
  );
};

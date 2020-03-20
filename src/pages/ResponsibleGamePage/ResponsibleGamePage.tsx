import React, { useContext } from 'react';
import BasicLayout from 'components/BasicLayout/BasicLayout';
import { SettingsPageLayout } from 'components/SettingsPageLayout/SettingsPageLayout';
import { PlayerBalanceLimits } from 'components/PlayerBalanceLimits/PlayerBalanceLimits';
import { PlayerTimeLimits } from 'components/PlayerTimeLimits/PlayerTimeLimits';
import { SelfExclusion } from 'components/SelfExclusion/SelfExclusion';
import { userLimitsSettingsHelper } from 'helpers/userLimitsSettings.helper';
import { AppContextShape } from 'interfaces/interfaces';
import { AppContext } from 'components/AppState/AppState';
import { FaqElementShape } from 'interfaces/FaqElement/FaqElement';
import { Protected } from 'components/Protected/Protected';

const RESPONSIBLE_GAME_FAQ: FaqElementShape[] = [
  {
    id: 1,
    title: 'Jakie limity mogę ustawić dla swojego Konta?',
    description:
      'W naszym serwisie dbamy o bezpieczną i odpowiedzialną grę. Każdy Gracz ma możliwość ustawienia różnych limitów na swoje Konto - limit wydanych środków i limit czasu zalogowania, w wymiarze dziennym i miesięcznym.'
  },
  {
    id: 2,
    title: 'Jak zmienić swoje limity na Koncie Gracza?',
    description:
      'Każdy Gracz może zmienić ustawione wcześniej limity. Każda zmiana na bardziej restrykcyjne limity następuje automatycznie. Aby zmienić limity na wyższe należy odczekać określony czas.'
  }
];

export const ResponsibleGamePage: React.FC = () => {
  const { state } = useContext<AppContextShape>(AppContext);

  const accountBreakInterval = userLimitsSettingsHelper.getAccountBreakIntervalsFromState(
    state
  );
  const selfExclusionInterval = userLimitsSettingsHelper.getSelfExclusionIntervalsFromState(
    state
  );

  return (
    <BasicLayout>
      <SettingsPageLayout
        icon={'blocked-screen'}
        pageTitle="Odpowiedzialna gra"
        faqElements={RESPONSIBLE_GAME_FAQ}
      >
        <Protected>
          <section className={'responsible-game'}>
            <PlayerBalanceLimits />
            <PlayerTimeLimits />
            <SelfExclusion
              selfExclusionIntervals={accountBreakInterval}
              title="USTAW CZAS PRZERWY"
              description="Masz możliwość ustawienia przerwy w dostępie do swojego konta. Po wyborze okresu wykluczenia konto będzie niedostępne, nie będzie możliwości jego aktywacji, aż do upływu wskazanego okresu."
              typeTextComplementary="przerwy"
              typeTextPastSingle="przerwę"
            />
            <SelfExclusion
              selfExclusionIntervals={selfExclusionInterval}
              title="FORMULARZ SAMOWYKLUCZENIA"
              description="Masz możliwość samowykluczenia z gry na trafonline.pl. W momencie, gdy proces samowykluczenia przez gracza zostanie zakończony, dostęp do obstawiania zakładów i wpłat zostanie zablokowany do momentu, kiedy zakończy się ustalony okres."
              typeTextComplementary="samowykluczenia"
              typeTextPastSingle="samowykluczenie"
            />
          </section>
        </Protected>
      </SettingsPageLayout>
    </BasicLayout>
  );
};

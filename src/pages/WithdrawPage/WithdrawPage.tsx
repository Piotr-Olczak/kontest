import React from 'react';
import BasicLayout from 'components/BasicLayout/BasicLayout';
import { SettingsPageLayout } from 'components/SettingsPageLayout/SettingsPageLayout';
import { WithdrawForm } from 'components/WithdrawForm/WithdrawForm';
import { FaqElementShape } from 'interfaces/FaqElement/FaqElement';
import { Protected } from 'components/Protected/Protected';

const WITHDRAW_FAQ: FaqElementShape[] = [
  {
    id: 1,
    title: 'Jak mogę odebrać zaświadczenie o uzyskanej wygranej?',
    description:
      'Na Twoje żądanie możemy wystawić imienne zaświadczenie o uzyskanej przez Ciebie wygranej. Zaświadczenie może być wystawione najpóźniej w dniu następującym po dniu, w którym uzyskano wygraną lub po dniu, w którym nastąpiła wypłata wygranej. W przypadku wygranych równych i wyższych niż 2280 zł musisz zgłosić się po odbiór wygranej i zaświadczenia do centrali Spółki Traf (ul. Kijowska 1, Warszawa). W przypadku wygranej niższej niż 2280 zł, także należy zgłosić do centrali Spółki z dokumentem tożsamości najpóźniej w dniu następującym po dniu, w którym uzyskano wygraną lub po dniu, w którym nastąpiła wypłata wygranej, tj. wartość wygranej została przypisana do Konta Gracza.'
  },
  {
    id: 2,
    title:
      'Jak długo muszę czekać na moje środki po zleceniu wypłaty na mój rachunek bankowy?',
    description:
      'Każda zlecona wypłata musi zostać zaakceptowana przez nasz dział finansowy. Transakcje są rozliczane na bieżąco, jednak w przypadkach wyjątkowych, na przykład gdy wypłata budzi podejrzenia naruszenia przepisów prawa, gdy transakcja wypłaty środków wymaga wyjaśnienia oraz w innych przypadkach niezależnych od Traf Zakłady Wzajemne, czas wypłaty może się przedłużyć do 7 dni roboczych.'
  },
  {
    id: 3,
    title: 'Jak mogę anulować zlecenie wypłaty?',
    description:
      'W przypadku chęci anulowania wypłaty prosimy o skontaktowanie się z naszym Contact Center pod numerem telefonu 459 59 99 60 lub pod adresem kontakt@trafonline.pl.'
  }
];

export const WithdrawPage: React.FC = props => {
  return (
    <BasicLayout>
      <SettingsPageLayout
        icon={'withdraw'}
        pageTitle="Wypłata środków"
        faqElements={WITHDRAW_FAQ}
      >
        <Protected>
          <WithdrawForm />
        </Protected>
      </SettingsPageLayout>
    </BasicLayout>
  );
};

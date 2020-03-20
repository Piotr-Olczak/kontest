import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';
import { Alert } from 'antd';

import BasicLayout from 'components/BasicLayout/BasicLayout';
import { SettingsPageLayout } from 'components/SettingsPageLayout/SettingsPageLayout';
import { FaqElementShape } from 'interfaces/FaqElement/FaqElement';
import { DepositForm } from 'components/DepositForm/DepositForm';
import { AntStatusesShape } from 'interfaces/antStatuses/antStatuses';
import { Protected } from 'components/Protected/Protected';

const DEPOSIT_FAQ: FaqElementShape[] = [
  {
    id: 1,
    title: 'Po jakim czasie środki które wpłacam pojawią się na moim portfelu?',
    description:
      'Wszystkie wpłaty dokonywane do serwisu są księgowane natychmiastowo.'
  },
  {
    id: 2,
    title: 'Jaka jest minimalna kwota wpłaty na portfel Gracza?',
    description:
      'Minimalna kwota jaką Gracz może wpłacić na swój portfel wynosi 10 zł.'
  }
];

export const DepositPage: React.FC<RouteComponentProps> = ({
  location
}: RouteComponentProps) => {
  const dotpayStatuses: AntStatusesShape = {
    OK: {
      type: 'success',
      message: 'Twoje konto zostało doładowane'
    },
    FAIL: {
      type: 'error',
      message: 'Coś poszło nie tak.'
    }
  };

  const [paymentStatus, setPaymentStatus] = useState();

  useEffect(() => {
    const search = queryString.parse(location.search);
    const status =
      search.status && Array.isArray(search.status)
        ? search.status[0]
        : search.status;

    if (status && status in dotpayStatuses) {
      setPaymentStatus(dotpayStatuses[status]);
    }
  }, [location.search, dotpayStatuses]);

  return (
    <BasicLayout>
      <SettingsPageLayout
        faqElements={DEPOSIT_FAQ}
        icon={'deposit'}
        pageTitle="Depozyt"
      >
        <Protected>
          {paymentStatus && (
            <Alert message={paymentStatus.message} type={paymentStatus.type} />
          )}

          <p>
            Aby dodać środki do swojego portfela skorzystaj z formularza
            poniżej.
          </p>

          <DepositForm setPaymentStatus={setPaymentStatus} />
        </Protected>
      </SettingsPageLayout>
    </BasicLayout>
  );
};

import BasicLayout from 'components/BasicLayout/BasicLayout';
import React from 'react';

const PayoutForecastsPage: React.FC = () => {
  return (
    <BasicLayout>
      <h1>Prognozy wypłat</h1>
      <iframe
        src={process.env.REACT_APP_INFOCENTER_IFRAME_URL}
        width="100%"
        height="1400"
        frameBorder="0"
        title="Prognozy wypłat"
      />
    </BasicLayout>
  );
};

export default PayoutForecastsPage;

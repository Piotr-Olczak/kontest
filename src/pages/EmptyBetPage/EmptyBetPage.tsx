import BasicLayout from 'components/BasicLayout/BasicLayout';
import { APP_URLS } from 'helpers/url.helper';
import React from 'react';
import { Link } from 'react-router-dom';

export const EmptyBetPage = () => {
  return (
    <BasicLayout activeBackground={true}>
      <h2>Nie ma takiego zakładu</h2>
      <Link to={APP_URLS.racesList}>Wróć do listy gonitw</Link>
    </BasicLayout>
  );
};

import BasicLayout from 'components/BasicLayout/BasicLayout';
import { APP_URLS } from 'helpers/url.helper';
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <BasicLayout>
      <h1>Przykro nam, wystąpił błąd</h1>
      <Link to={APP_URLS.login}>Powrót do strony logowania</Link>
    </BasicLayout>
  );
};

export default ErrorPage;

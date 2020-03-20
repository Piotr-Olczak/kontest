import { LayoutHeader, LayoutFooter } from 'components/BasicLayout/BasicLayout';
import { APP_URLS } from 'helpers/url.helper';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'components/Container/Container';

const NotFoundPage: React.FC = () => {
  return (
    <main className="basic-layout">
      <LayoutHeader showMenu={false} />
      <section className="basic-layout__content">
        <Container>
          <h1>Przykro nam, podana strona nie istnieje</h1>
          <Link to={APP_URLS.homepage}>Powrót do strony głównej</Link>
        </Container>
      </section>
      <LayoutFooter />
    </main>
  );
};

export default NotFoundPage;

import React from 'react';
import { Logo } from 'components/Logo/Logo';
import { Spinner } from 'components/Spinner/Spinner';

export const LoadingScreen: React.FC = props => {
  return (
    <section className={'loading-screen'}>
      <article className={'loading-screen__content'}>
        <Logo />
        <div className={'loading-screen__spinner'}>
          <Spinner />
          <p>Ładowanie...</p>
        </div>
      </article>
    </section>
  );
};

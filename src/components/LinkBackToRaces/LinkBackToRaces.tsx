import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { APP_URLS } from 'helpers/url.helper';

interface LinkBackToRacesPropsShape {
  extraStyles?: string;
}

export const LinkBackToRaces: React.FC<LinkBackToRacesPropsShape> = props => {
  const buttonClassNames = classNames('link-back-to-races', props.extraStyles);
  return (
    <Link to={APP_URLS.racesList} className={buttonClassNames}>
      {'<< '}Wróć do listy gonitw
    </Link>
  );
};

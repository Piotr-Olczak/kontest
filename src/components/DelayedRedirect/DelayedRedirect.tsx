import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

interface DelayedRedirectPropsShape {
  delay: number;
  url: string;
}

export const DelayedRedirect: React.FC<DelayedRedirectPropsShape> = props => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setRedirect(true);
    }, props.delay);

    return () => clearTimeout(delay);
  });

  return (
    <div>
      <p>Wkrótce zostaniesz przekierowany...</p>
      {redirect && <Redirect to={props.url} />}
    </div>
  );
};

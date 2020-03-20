import React from 'react';
import classNames from 'classnames';

interface Container {
  className?: string;
}

export const Container: React.FC<Container> = props => {
  const { className } = props;
  const sectionClassNames = classNames('container', className);
  return <section className={sectionClassNames}>{props.children}</section>;
};

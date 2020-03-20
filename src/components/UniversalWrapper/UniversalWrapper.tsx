import React from 'react';

export const UniversalWrapper: React.FC = props => {
  return <div className="universal-wrapper">{props.children}</div>;
};

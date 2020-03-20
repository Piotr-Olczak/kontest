import React from 'react';
import BasicLayout from 'components/BasicLayout/BasicLayout';
import HowToPlay from 'components/HowToPlay/HowToPlay';

export const PlayInstructionPage: React.FC = props => {
  return (
    <BasicLayout>
      <h1>Jak grać?</h1>
      <HowToPlay />
    </BasicLayout>
  );
};

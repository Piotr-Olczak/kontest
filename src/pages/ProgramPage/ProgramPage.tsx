import React from 'react';
import BasicLayout from 'components/BasicLayout/BasicLayout';
import ProgramList from 'components/ProgramList/ProgramList';

const ProgramPage: React.FC = () => {
  return (
    <BasicLayout>
      <h1>Program gonitw</h1>
      <ProgramList />
    </BasicLayout>
  );
};

export default ProgramPage;

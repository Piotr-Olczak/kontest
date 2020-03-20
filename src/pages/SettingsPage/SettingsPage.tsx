import React from 'react';
import BasicLayout from 'components/BasicLayout/BasicLayout';
import { SettingsPageLayout } from 'components/SettingsPageLayout/SettingsPageLayout';

export const SettingsPage = () => {
  return (
    <BasicLayout>
      <SettingsPageLayout
        icon={'settings'}
        pageTitle="Ustawienia konta"
        isMainSettingsPage={true}
      />
    </BasicLayout>
  );
};

import React from 'react';
import { FaqElementShape } from 'interfaces/FaqElement/FaqElement';

interface SettingsFaqShape {
  faq: FaqElementShape;
}

export const SettingsFaq: React.FC<SettingsFaqShape> = props => {
  const { faq } = props;
  if (!faq) return null;
  return (
    <div className="settings-faq">
      <p className="settings-faq__title">{faq.title}</p>
      <p className="settings-faq__desc">{faq.description}</p>
    </div>
  );
};

import React from 'react';
import { UnusedHorsesShape } from 'contexts/singleBet.context';
import { hasOnlyArrayElements } from 'helpers/utils';

export const UnusedHorsesWarning: React.FC<{
  unusedHorses: UnusedHorsesShape | undefined;
}> = props => {
  const { unusedHorses } = props;
  return (
    <p className="bet-content__body__alert-info">
      {Array.isArray(unusedHorses) &&
        !hasOnlyArrayElements(unusedHorses) &&
        'Zaznaczone konie nie biorą udziału w żadnej kombinacji. Zmodyfikuj wybór przed zatwierdzeniem zakładu.'}
    </p>
  );
};

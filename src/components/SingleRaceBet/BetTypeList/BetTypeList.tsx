import { BtnColor } from 'components/BtnColor/BtnColor';
import { SingleRaceBetTypeShape } from 'interfaces/racedays/racedays';
import React from 'react';

interface BetTypeList {
  onTypeChange: Function;
  betTypes: SingleRaceBetTypeShape[];
  activeBetApiCode: string;
}

export const BetTypeList: React.FC<BetTypeList> = props => {
  const { betTypes, onTypeChange, activeBetApiCode } = props;

  const handleTypeChange = (betType: SingleRaceBetTypeShape) => {
    onTypeChange(betType);
  };

  const isBetActive = (betType: SingleRaceBetTypeShape): boolean => {
    return betType.betTypeApiCode === activeBetApiCode;
  };
  return (
    <div className={'single-bet-types'}>
      <p>Typ zakładu:</p>
      <ul className={'single-bet-types__list'}>
        {betTypes.map(betType => (
          <li key={betType.betTypeButtonLabel}>
            <BtnColor
              isActive={isBetActive(betType)}
              btnType={'primary'}
              onClick={handleTypeChange.bind(null, betType)}
            >
              {betType.betTypeButtonLabel}
                </BtnColor>

                Tooltip

          </li>
        ))}
      </ul>
    </div>
  );
};

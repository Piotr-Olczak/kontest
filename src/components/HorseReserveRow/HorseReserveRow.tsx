import { BtnColor } from 'components/BtnColor/BtnColor';
import React from 'react';

interface HorseReserveRowShape {
  onReserveChange: { (newReserve: number): void };
  activeReserve?: number;
  reserveHorses: number[];
}

export const HorseReserveRow: React.FC<HorseReserveRowShape> = props => {
  const { onReserveChange, activeReserve, reserveHorses } = props;

  const handleReserveClick = (reserveNumber: number) => {
    if (reserveNumber === activeReserve) onReserveChange(0);
    else onReserveChange(reserveNumber);
  };

  return (
    <article className={'reserve'}>
      <p>Rezerwa: </p>
      <div className={'reserve__list'}>
        {reserveHorses.map((reserveNumber: number) => (
          <BtnColor
            key={reserveNumber}
            btnType={'tertiary'}
            isActive={activeReserve === reserveNumber}
            onClick={handleReserveClick.bind(null, reserveNumber)}
          >
            {reserveNumber}
          </BtnColor>
        ))}
      </div>
    </article>
  );
};

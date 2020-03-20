/**
 * This compontes has been wrapped around to get access to context.
 */

import React, { useContext } from 'react';
import { InfocenterHorseExtra } from 'interfaces/infocenter/infocenter';
import { InfocenterHorsesTable } from 'components/InfocenterHorsesTable/InfocenterHorsesTable';
import { SingleBetContext } from 'contexts/singleBet.context';

interface SingleRaceBetInfocenterHorsesTablePropsShape {
  horsesExtraInfo: InfocenterHorseExtra[];
}

export const SingleRaceBetInfocenterHorsesTable: React.FC<
  SingleRaceBetInfocenterHorsesTablePropsShape
> = props => {
  const { horsesExtraInfo } = props;

  const { singleBetState } = useContext(SingleBetContext);
  const { horsesSelected } = singleBetState;

  return (
    <InfocenterHorsesTable
      horsesExtraInfo={horsesExtraInfo}
      horsesSelected={horsesSelected}
    />
  );
};

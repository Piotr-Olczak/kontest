import { HorseSelectionShape } from 'interfaces/HorseSelection/HorseSelectionShape';
import {
  GameStateRaceShape,
  SingleRaceBetTypeShape
} from 'interfaces/racedays/racedays';
import React, { useState } from 'react';

export interface RaceDayInfoShape {
  trackCode: string;
  raceDate: number;
  eventsPlace: string;
}
export class SingleBetStateShape {
  activeBetType: SingleRaceBetTypeShape = new SingleRaceBetTypeShape();
  activeBetBoxAllowed: boolean = false;
  horsesSelected: HorseSelectionShape[] = [];
  multiplier: number = 1;
  reserve?: number;
  race?: GameStateRaceShape;
  raceDayInfo?: RaceDayInfoShape;
  unusedHorses?: UnusedHorsesShape;
}
export type UnusedHorsesShape = {
  [index: number]: Array<number>;
};

export class SingleBetContextShape {
  singleBetState: SingleBetStateShape = new SingleBetStateShape();
  setSingleBetState: { (betState: SingleBetStateShape): void } = () => { };
}

export const SingleBetContext = React.createContext<SingleBetContextShape>(
  new SingleBetContextShape()
);

export const SingleBetContextProvider: React.FC = props => {
  const [betState, setBetState] = useState(new SingleBetStateShape());
  const handleContextChange = (newBetState: SingleBetStateShape) => {
    setBetState(newBetState);
  };

  return (
    <SingleBetContext.Provider
      value={{
        singleBetState: betState,
        setSingleBetState: handleContextChange
      }}
    >
      {props.children}
    </SingleBetContext.Provider>
  );
};

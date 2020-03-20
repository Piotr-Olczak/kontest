import { SingleBetHorsesRow } from 'components/SingleRaceBet/SingleBetHorsesSelection/SingleBetHorsesRow/SingleBetHorsesRow';
import { HorseSelectionShape } from 'interfaces/HorseSelection/HorseSelectionShape';
import { GameStateRaceShape } from 'interfaces/racedays/racedays';
import React from 'react';

import { UnusedHorsesShape } from 'contexts/singleBet.context';

interface SingleBetHorsesSelectionShape {
  rowsSelection: HorseSelectionShape[];
  onSelectionChange: { (selection: HorseSelectionShape[]): void };
  race: GameStateRaceShape;
  activeBetBoxAllowed: boolean;
  unusedHorses?: UnusedHorsesShape | undefined;
}

export const SingleBetHorseSelection: React.FC<
  SingleBetHorsesSelectionShape
> = props => {
  const {
    race,
    onSelectionChange,
    rowsSelection,
    activeBetBoxAllowed,
    unusedHorses
  } = props;

  const handleHorseSelectionChange = (
    changedRowIndex: number,
    changedRowSelection: HorseSelectionShape
  ) => {
    let isWithBox = changedRowSelection.isBoxOn;

    const newSelection = rowsSelection.map(
      (rowSelection: HorseSelectionShape, rowIndex: number) => {
        if (changedRowIndex === rowIndex) return changedRowSelection;

        // resets selectedHorses in selections following selection with box
        if (changedRowIndex < rowIndex && isWithBox)
          return { ...rowSelection, selectedHorses: [] };

        return rowSelection;
      }
    );
    onSelectionChange(newSelection);
  };

  const shouldHide = (
    rowIndex: number,
    selectionRows: HorseSelectionShape[]
  ): boolean => {
    // distinguish if should hide if row higher has # selected
    const rowWithBoxAbove = selectionRows.find(
      (rowSelection: HorseSelectionShape, index: number) => {
        const isRowAbove = index < rowIndex;
        const isBoxSelected = rowSelection && rowSelection.isBoxOn;

        return isRowAbove && isBoxSelected;
      }
    );
    return !!rowWithBoxAbove;
  };

  const visibleSelectionRows = rowsSelection.filter(
    (row, index, rows) => !shouldHide(index, rows)
  );

  return (
    <>
      {visibleSelectionRows.map(
        (rowSelection: HorseSelectionShape, index: number) => (
          <SingleBetHorsesRow
            rowSelection={rowSelection}
            key={index}
            rowLabel={`Miejsce ${index + 1}:`}
            horsesRacing={race.activeHorseNumbers}
            numOfAllHorses={race.horsesNumber}
            isEven={index % 2 === 0}
            onHorseChange={handleHorseSelectionChange.bind(null, index)}
            activeBetBoxAllowed={activeBetBoxAllowed}
            unusedHorses={unusedHorses && unusedHorses[index]}
          />
        )
      )}
    </>
  );
};

// must check to stop infinite rerender loop
export default React.memo(SingleBetHorseSelection, (prevProps, nextProps) => {
  const isRowsSelectionEq = prevProps.rowsSelection === nextProps.rowsSelection;
  const isRaceEq = prevProps.race.raceNumber === nextProps.race.raceNumber;
  return isRowsSelectionEq && isRaceEq;
});

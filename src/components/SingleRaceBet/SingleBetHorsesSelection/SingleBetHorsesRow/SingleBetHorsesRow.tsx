import classNames from 'classnames';
import { BtnColor } from 'components/BtnColor/BtnColor';
import { generateArray } from 'helpers/utils';
import { HorseSelectionShape } from 'interfaces/HorseSelection/HorseSelectionShape';
import React from 'react';

interface SingleBetHorsesRowShape {
  horsesRacing: number[];
  numOfAllHorses: number;
  onHorseChange: { (newRowSelection: HorseSelectionShape): void };
  rowSelection: HorseSelectionShape;
  rowLabel?: string;
  isEven?: boolean;
  activeBetBoxAllowed: boolean;
  unusedHorses?: Array<number>;
}

export const SingleBetHorsesRow: React.FC<SingleBetHorsesRowShape> = props => {
  const {
    horsesRacing,
    numOfAllHorses,
    onHorseChange,
    rowSelection,
    rowLabel,
    isEven,
    activeBetBoxAllowed,
    unusedHorses
  } = props;
  const { isBoxOn, isWallOn, selectedHorses } = rowSelection;
  const isHorseDisabled = (horseNumber: number): boolean => {
    return !horsesRacing.includes(horseNumber);
  };

  const getAllHorses = (): number[] => {
    // not all horses start in race. Some may be disabled.
    // We have num of all horses and list of active horses running in race.
    // Here we generate array of all horses based on number of all horses
    return generateArray(numOfAllHorses).map(
      (item, index: number) => index + 1
    );
  };

  const isHorseSelected = (horseNumber: number): boolean => {
    return selectedHorses.includes(horseNumber);
  };

  const selectHorse = (horseNumber: number): void => {
    const updatedSelectedHorses = [...selectedHorses, horseNumber].sort(
      (a, b) => a - b
    );

    onHorseChange({
      ...rowSelection,
      isWallOn: false,
      selectedHorses: updatedSelectedHorses
    });
  };

  const unselectHorse = (horseNumber: number): void => {
    const updatedSelectedHorses = selectedHorses.filter(
      (selectedHorseNum: number) => selectedHorseNum !== horseNumber
    );
    onHorseChange({
      ...rowSelection,
      isWallOn: false,
      selectedHorses: updatedSelectedHorses
    });
  };

  const handleHorseToggle = (horseNum: number) => {
    const isSelected = isHorseSelected(horseNum);

    if (isSelected) unselectHorse(horseNum);
    else selectHorse(horseNum);
  };

  const handleWallToggle = () => {
    // clearing out selected horse arr as in this fancy machine we got
    onHorseChange({
      ...rowSelection,
      isWallOn: !isWallOn,
      selectedHorses: []
    });
  };

  const handleBoxToggle = () => {
    onHorseChange({ ...rowSelection, isBoxOn: !isBoxOn });
  };

  const allHorses = getAllHorses();
  if (!Array.isArray(horsesRacing)) return null;

  const classes = classNames('single-horse-row', {
    'single-horse-row--even': isEven
  });

  const isHorseUnused = (horseNum: number) =>
    unusedHorses && unusedHorses.includes(horseNum) ? 'unused' : '';

  return (
    <div className={classes}>
      <p>{rowLabel}</p>
      <ul className={'single-horse-row__list'}>
        {activeBetBoxAllowed === true && (
          <li>
            <BtnColor
              btnType={'secondary'}
              isActive={isBoxOn}
              onClick={handleBoxToggle}
            >
              #
            </BtnColor>
          </li>
        )}
        {allHorses.map(horseNum => (
          <li key={horseNum} className={isHorseUnused(horseNum)}>
            <BtnColor
              btnType={'secondary'}
              onClick={handleHorseToggle.bind(null, horseNum)}
              disabled={isHorseDisabled(horseNum)}
              isActive={isHorseSelected(horseNum)}
            >
              {horseNum}
            </BtnColor>
          </li>
        ))}

        <li>
          <BtnColor
            btnType={'secondary'}
            isActive={isWallOn}
            onClick={handleWallToggle}
          >
            *
          </BtnColor>
        </li>
      </ul>
    </div>
  );
};

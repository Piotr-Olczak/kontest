import React from 'react';
import { Field } from 'formik';
import classNames from 'classnames';

export interface PlayerLimitFieldShape {
  name: string;
  type: 'amount' | 'hours' | 'minutes';
  disabled?: boolean;
}
const PlayerLimitField: React.FC<PlayerLimitFieldShape> = props => {
  const { name, type, disabled } = props;
  const typeClass = 'player-limit__field-' + type;

  const playerLimitFieldClass = classNames('player-limit__field', typeClass);

  let typeValue = '';
  switch (type) {
    case 'amount':
      typeValue = 'zł';
      break;
    case 'hours':
      typeValue = 'godz.';
      break;
    case 'minutes':
      typeValue = 'min';
      break;
    default:
      typeValue = '';
      break;
  }

  return (
    <div className={playerLimitFieldClass}>
      <Field
        id={name}
        type="number"
        min={0}
        max={type === 'minutes' ? 59 : 99999999}
        name={name}
        disabled={disabled}
      />
      <span>{typeValue}</span>
    </div>
  );
};

export default PlayerLimitField;

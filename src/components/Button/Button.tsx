import classNames from 'classnames';
import { Spinner } from 'components/Spinner/Spinner';
import React from 'react';

export interface ButtonShape {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  buttonStyle?: 'empty' | 'full' | 'empty-light';
  extraClasses?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClickFunction?(value: any): void;
}

const Button: React.FC<ButtonShape> = props => {
  let {
    disabled,
    type,
    loading,
    buttonStyle,
    extraClasses,
    fullWidth,
    label,
    onClickFunction
  } = props;

  buttonStyle = buttonStyle ? buttonStyle : 'full';
  type = type ? type : 'button';
  disabled = disabled ? disabled : loading;

  const buttonClassName = classNames(
    'btn',
    {
      'btn--empty': buttonStyle === 'empty',
      'btn--empty btn--empty-light': buttonStyle === 'empty-light',
      'btn--full': buttonStyle === 'full',
      'btn--fullWidth': fullWidth
    },
    extraClasses
  );

  return (
    <button
      type={type}
      className={buttonClassName}
      onClick={onClickFunction}
      disabled={disabled}
    >
      {label}
      {loading && <Spinner />}
    </button>
  );
};

export default Button;

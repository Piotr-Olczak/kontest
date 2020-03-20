import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';

interface BtnColor extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: 'primary' | 'secondary' | 'tertiary' | 'alternative';
  isActive?: boolean;
}

export const BtnColor: React.FC<BtnColor> = props => {
  const { btnType, isActive, className, children, ...restProps } = props;
  const mapTypeToClass = {
    primary: 'btnColor--primary',
    secondary: 'btnColor--secondary',
    tertiary: 'btnColor--tertiary',
    alternative: 'btnColor--alternative'
  };

  const selectedClass: string = btnType ? mapTypeToClass[btnType] : '';
  const btnClasses: string = classNames('btnColor', className, selectedClass, {
    'btnColor--active': isActive,
    'btnColor--disabled': restProps.disabled
  });

  return (
    <button className={btnClasses} {...restProps}>
      {props.children}
    </button>
  );
};

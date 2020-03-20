import React, { useState } from 'react';
import classNames from 'classnames';

interface MenuButton {
  onToggleChange: Function;
}

export const MenuButton: React.FC<MenuButton> = props => {
  const { onToggleChange } = props;

  const [isToggled, setToggle] = useState(false);
  const handleClick = () => {
    onToggleChange(!isToggled);
    setToggle(!isToggled);
  };

  const classes = classNames({
    'menu-icon': true,
    'menu-icon--active': isToggled
  });
  return (
    <button className={classes} onClick={handleClick}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </button>
  );
};

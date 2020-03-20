import React from 'react';
import classNames from 'classnames';

export interface FormGroupShape {
  title?: string;
  header?: string;
  footer?: string;
  extraClasses?: string;
}

const FormGroup: React.FC<FormGroupShape> = props => {
  const { title, header, footer, children, extraClasses } = props;

  const formGroupClassName = classNames(
    {
      'form-group': true
    },
    extraClasses
  );

  return (
    <div className={formGroupClassName}>
      {title && <h4 className="form-group-title">{title}</h4>}
      {header && <p className="form-group-header">{header}</p>}
      {children}
      {footer && <p className="form-group-footer">{footer}</p>}
    </div>
  );
};

export default FormGroup;

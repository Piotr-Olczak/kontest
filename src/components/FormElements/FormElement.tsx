import { FormElementShape } from 'interfaces/forms/formElement';

import React from 'react';
import classNames from 'classnames';

const FormElement: React.FC<FormElementShape> = props => {
  const validationStatus = props.validationStatus
    ? props.validationStatus
    : 'not-validated';
  const extraClasses: string = props.extraClasses ? props.extraClasses : '';
  const validationMessage: string = props.validationMessage
    ? props.validationMessage
    : '';
  const formElementClassName = classNames(
    {
      'form-element': true,
      'form-element--invalid': validationStatus === 'invalid',
      'form-element--valid': validationStatus === 'valid'
    },
    extraClasses
  );
  return (
    <div className={formElementClassName}>
      {props.children}
      {validationMessage && (
        <span className="form-element__error-message">{validationMessage}</span>
      )}
    </div>
  );
};

export default FormElement;

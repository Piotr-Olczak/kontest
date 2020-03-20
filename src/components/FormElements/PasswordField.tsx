import React, { useState } from 'react';
import { Field } from 'formik';
import FormElement from 'components/FormElements/FormElement';
import { Icon } from 'components/Icon/Icon';
import { ValidationStatusShape } from 'interfaces/forms/formElement';

interface PasswordFieldTypesShape {
  password: string;
  text: string;
}

const passwordFieldTypes: PasswordFieldTypesShape = {
  password: 'password',
  text: 'text'
};

interface PasswordFieldShape extends PasswordFieldDynamic {
  validationStatus?: ValidationStatusShape;
  validationMessage?: string;
}

interface PasswordFieldDynamic {
  name?: string;
  label?: string;
}

const defaultProps: PasswordFieldDynamic = {
  name: 'password',
  label: 'Hasło'
};

const PasswordField: React.FC<PasswordFieldShape> = props => {
  const [fieldType, setFieldType] = useState(passwordFieldTypes.password);

  const handleTypeChange = () => {
    const newFieldType =
      fieldType === passwordFieldTypes.password
        ? passwordFieldTypes.text
        : passwordFieldTypes.password;
    setFieldType(newFieldType);
  };

  return (
    <FormElement extraClasses="form-element--password" {...props}>
      <label className="form-element__label" htmlFor={props.name}>
        {props.label}
      </label>
      <div className="form-element--password-wrapper">
        <Field id={props.name} type={fieldType} name={props.name} />
        <button
          className="form-element__password-toggle"
          onClick={handleTypeChange}
          type="button"
        >
          <Icon type="eye" />
        </button>
      </div>
    </FormElement>
  );
};

PasswordField.defaultProps = defaultProps;

export default PasswordField;

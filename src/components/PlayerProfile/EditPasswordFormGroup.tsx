import React from 'react';
import FormGroup from 'components/FormGroup/FormGroup';
import { formGroupShape } from 'interfaces/forms/formGroupShape';
import { ChangePasswordForm } from 'components/ChangePasswordForm/ChangePasswordForm';

const EditPasswordFormGroup: React.FC<formGroupShape> = props => {
  return (
    <FormGroup title="Zmiana hasła" extraClasses="form-group--edit-password">
      <ChangePasswordForm />
    </FormGroup>
  );
};

export default EditPasswordFormGroup;

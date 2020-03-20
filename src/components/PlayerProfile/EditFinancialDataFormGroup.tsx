import React from 'react';
import FormGroup from 'components/FormGroup/FormGroup';
import FormElement from 'components/FormElements/FormElement';
import BankAccountNumberField from 'components/FormElements/BankAccountField';
import { formGroupShape } from 'interfaces/forms/formGroupShape';

const EditFinancialDataFormGroup: React.FC<formGroupShape> = props => {
  const { errors } = props;
  return (
    <FormGroup title="Dane konta">
      <FormElement
        extraClasses="form-element--full"
        validationStatus={
          errors.bankAccountNumber ? 'invalid' : 'not-validated'
        }
        validationMessage={
          errors.bankAccountNumber ? errors.bankAccountNumber : ''
        }
      >
        <label className="form-element__label" htmlFor="bankAccountNumber">
          Nr Twojego konta bankowego
        </label>
        <BankAccountNumberField name="bankAccountNumber" />
      </FormElement>
    </FormGroup>
  );
};

export default EditFinancialDataFormGroup;

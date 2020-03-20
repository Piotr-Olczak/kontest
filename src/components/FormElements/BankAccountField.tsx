import React from 'react';
import { Field } from 'formik';

export interface BankAccountNumberFieldShape {
  name: string;
}
const BankAccountNumberField: React.FC<BankAccountNumberFieldShape> = props => {
  const { name } = props;

  return (
    <div className="bank-account-number__field">
      <span>PL</span>
      <Field id={name} type="text" name={name} />
    </div>
  );
};

export default BankAccountNumberField;

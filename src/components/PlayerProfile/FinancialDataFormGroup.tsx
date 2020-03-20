import React from 'react';
import { Field } from 'formik';
import FormGroup from 'components/FormGroup/FormGroup';
import FormElement from 'components/FormElements/FormElement';
import BankAccountNumberField from 'components/FormElements/BankAccountField';
import { formGroupShape } from 'interfaces/forms/formGroupShape';

export const financialDataInitialValues = {
  bankAccountNumber: '',
  fundsSource: '',
  ownerFundsDeclaration: false
};

const FinancialDataFormGroup: React.FC<formGroupShape> = props => {
  const { errors } = props;
  return (
    <FormGroup title="Twoje dane">
      <FormElement
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
      <FormElement
        validationStatus={errors.fundsSource ? 'invalid' : 'not-validated'}
        validationMessage={errors.fundsSource ? errors.fundsSource : ''}
      >
        <label className="form-element__label" htmlFor="fundsSource">
          Źródło środków przeznaczonych na grę
        </label>
        <Field id="fundsSource" component="select" name="fundsSource">
          <option>Wybierz źródło środków</option>
          <option value="COMPANY">Działalność gospodarcza</option>
          <option value="CONTRACT">Umowa o dzieło lub umowa zlecenia</option>
          <option value="EMPLOYMENT">Umowa o pracę</option>
          <option value="FALL_OR_DONATION">Spadek, darowizna</option>
          <option value="FREELANCE">Wykonywanie wolnego zawodu</option>
          <option value="RENT">Emerytura lub renta</option>
          <option value="WIN_OR_PRIZE">Wygrana lub nagroda</option>
        </Field>
      </FormElement>
      <FormElement
        validationStatus={
          errors.ownerFundsDeclaration ? 'invalid' : 'not-validated'
        }
        validationMessage={
          errors.ownerFundsDeclaration ? errors.ownerFundsDeclaration : ''
        }
      >
        <Field
          id="ownerFundsDeclaration"
          type="checkbox"
          name="ownerFundsDeclaration"
        />
        <label htmlFor="ownerFundsDeclaration">
          Oświadczam, że jestem beneficjentem rzeczywistym właścicielem środków
          przeznaczonych na grę.
        </label>
      </FormElement>
      <FormElement>
        <p className="form-element__label">
          Oświadczam, że środki pieniężne przeznaczone na grę będą pochodziły z
          legalnego źródła.
        </p>
      </FormElement>
    </FormGroup>
  );
};

export default FinancialDataFormGroup;

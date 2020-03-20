import React from 'react';
import { Field } from 'formik';
import FormGroup from 'components/FormGroup/FormGroup';
import FormElement from 'components/FormElements/FormElement';
import PasswordField from 'components/FormElements/PasswordField';
import { DateHelper } from 'helpers/date.helper';
import { formGroupShape } from 'interfaces/forms/formGroupShape';

export const basicDataInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: '',
  pesel: '',
  idDocumentNumber: '',
  birthYear: '',
  birthMonth: '',
  birthDay: ''
};

const BasicDataFormGroup: React.FC<formGroupShape> = props => {
  const { errors } = props;
  const currentYear: number = new Date().getUTCFullYear();
  const minAge: number = 18;
  const oldestYear: number = currentYear - 100;
  let year: number = currentYear - minAge;
  let availableYears: Array<number> = [];

  for (year; year > oldestYear; year--) {
    availableYears.push(year);
  }

  const availableMonths: Array<number> = [];
  for (let month = 1; month < 13; month++) {
    availableMonths.push(month);
  }

  const availableDays: Array<number> = [];
  for (let day = 1; day < 32; day++) {
    availableDays.push(day);
  }

  let birthDateError = '';
  if (errors.birthDay) {
    birthDateError = errors.birthDay;
  } else if (errors.birthMonth) {
    birthDateError = errors.birthMonth;
  } else if (errors.birthYear) {
    birthDateError = errors.brithYear;
  }
  return (
    <FormGroup title="Twoje dane">
      <FormElement
        validationStatus={errors.firstName ? 'invalid' : 'not-validated'}
        validationMessage={errors.firstName ? errors.firstName : ''}
      >
        <label className="form-element__label" htmlFor="firstName">
          Imię
        </label>
        <Field id="firstName" type="text" name="firstName" />
      </FormElement>
      <FormElement
        validationStatus={errors.lastName ? 'invalid' : 'not-validated'}
        validationMessage={errors.lastName ? errors.lastName : ''}
      >
        <label className="form-element__label" htmlFor="lastName">
          Nazwisko
        </label>
        <Field id="lastName" type="text" name="lastName" />
      </FormElement>
      <FormElement
        validationStatus={errors.email ? 'invalid' : 'not-validated'}
        validationMessage={errors.email ? errors.email : ''}
      >
        <label className="form-element__label" htmlFor="email">
          Adres e-mail
        </label>
        <Field id="email" type="text" name="email" />
      </FormElement>
      <PasswordField
        validationStatus={errors.password ? 'invalid' : 'not-validated'}
        validationMessage={errors.password ? errors.password : ''}
      />
      <FormElement
        validationStatus={errors.phoneNumber ? 'invalid' : 'not-validated'}
        validationMessage={errors.phoneNumber ? errors.phoneNumber : ''}
      >
        <label className="form-element__label" htmlFor="phoneNumber">
          Numer telefonu
        </label>
        <Field id="phoneNumber" type="text" name="phoneNumber" />
      </FormElement>
      <FormElement
        validationStatus={errors.pesel ? 'invalid' : 'not-validated'}
        validationMessage={errors.pesel ? errors.pesel : ''}
      >
        <label className="form-element__label" htmlFor="pesel">
          Numer PESEL
        </label>
        <Field id="pesel" type="text" name="pesel" />
      </FormElement>
      <div className="register-form__date-wrapper">
        <p className="form-element__label">Data urodzenia</p>
        <FormElement extraClasses="form-element__date-select">
          <Field id="birthDay" component="select" name="birthDay">
            <option>Dzień</option>
            {availableDays.map(day => {
              return (
                <option key={day} value={DateHelper.parseToTwoDigit(day)}>
                  {DateHelper.parseToTwoDigit(day)}
                </option>
              );
            })}
          </Field>
        </FormElement>
        <FormElement extraClasses="form-element__date-select">
          <Field id="birthMonth" component="select" name="birthMonth">
            <option>Miesiąc</option>
            {availableMonths.map(month => {
              return (
                <option key={month} value={DateHelper.parseToTwoDigit(month)}>
                  {DateHelper.parseToTwoDigit(month)}
                </option>
              );
            })}
          </Field>
        </FormElement>
        <FormElement extraClasses="form-element__date-select">
          <Field id="birthYear" component="select" name="birthYear">
            <option>Rok</option>
            {availableYears.map(year => {
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </Field>
        </FormElement>
        {birthDateError && (
          <span className="form-element__error-message">{birthDateError}</span>
        )}
      </div>
      <FormElement
        validationStatus={errors.idDocumentNumber ? 'invalid' : 'not-validated'}
        validationMessage={
          errors.idDocumentNumber ? errors.idDocumentNumber : ''
        }
      >
        <label className="form-element__label" htmlFor="idDocumentNumber">
          Numer dowodu osobistego
        </label>
        <Field id="idDocumentNumber" type="text" name="idDocumentNumber" />
      </FormElement>
    </FormGroup>
  );
};

export default BasicDataFormGroup;

import React from 'react';
import { Field } from 'formik';
import FormGroup from 'components/FormGroup/FormGroup';
import FormElement from 'components/FormElements/FormElement';
import { formGroupShape } from 'interfaces/forms/formGroupShape';

const EditBasicDataFormGroup: React.FC<formGroupShape> = props => {
  const { errors } = props;
  return (
    <FormGroup title="Twoje dane">
      <FormElement>
        <label className="form-element__label" htmlFor="firstName">
          Imię
        </label>
        <Field id="firstName" type="text" name="firstName" disabled />
      </FormElement>
      <FormElement>
        <label className="form-element__label" htmlFor="lastName">
          Nazwisko
        </label>
        <Field id="lastName" type="text" name="lastName" disabled />
      </FormElement>
      <FormElement
        validationStatus={errors.email ? 'invalid' : 'not-validated'}
        validationMessage={errors.email ? errors.email : ''}
      >
        <label className="form-element__label" htmlFor="email">
          Adres e-mail
        </label>
        <Field id="email" type="text" name="email" disabled />
      </FormElement>
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
        <Field id="pesel" type="text" name="pesel" disabled />
      </FormElement>
      <FormElement
        validationStatus={errors.idDocumentNumber ? 'invalid' : 'not-validated'}
        validationMessage={
          errors.idDocumentNumber ? errors.idDocumentNumber : ''
        }
      >
        <label className="form-element__label" htmlFor="idDocumentNumber">
          Numer dowodu osobistego
        </label>
        <Field
          id="idDocumentNumber"
          type="text"
          name="idDocumentNumber"
          disabled
        />
      </FormElement>

      <div className="register-form__date-wrapper form-element--full">
        <p className="form-element__label">Data urodzenia</p>
        <FormElement extraClasses="form-element__date-select">
          <Field id="birthDay" type="text" name="birthDay" disabled />
        </FormElement>
        <FormElement extraClasses="form-element__date-select">
          <Field id="birthMonth" type="text" name="birthMonth" disabled />
        </FormElement>
        <FormElement extraClasses="form-element__date-select">
          <Field id="birthYear" type="text" name="birthYear" disabled />
        </FormElement>
      </div>
    </FormGroup>
  );
};

export default EditBasicDataFormGroup;

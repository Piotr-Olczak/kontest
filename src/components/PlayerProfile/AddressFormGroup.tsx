import React from 'react';
import { Field } from 'formik';
import FormGroup from 'components/FormGroup/FormGroup';
import FormElement from 'components/FormElements/FormElement';
import { formGroupShape } from 'interfaces/forms/formGroupShape';

export const addressInitialValues = {
  street: '',
  houseNr: '',
  flatNr: '',
  city: '',
  postalCode: '',
  country: 'Polska',
  nationality: 'PL'
};

const AddressFormGroup: React.FC<formGroupShape> = props => {
  const { errors } = props;
  return (
    <FormGroup title="Adres zamieszkania" extraClasses="form-group--address">
      <FormElement
        validationStatus={errors.street ? 'invalid' : 'not-validated'}
        validationMessage={errors.street ? errors.street : ''}
      >
        <label className="form-element__label" htmlFor="street">
          Ulica
        </label>
        <Field id="street" type="text" name="street" />
      </FormElement>
      <FormElement
        validationStatus={errors.houseNr ? 'invalid' : 'not-validated'}
        validationMessage={errors.houseNr ? errors.houseNr : ''}
      >
        <label className="form-element__label" htmlFor="">
          Nr domu
        </label>
        <Field id="houseNr" type="text" name="houseNr" />
      </FormElement>
      <FormElement
        validationStatus={errors.flatNr ? 'invalid' : 'not-validated'}
        validationMessage={errors.flatNr ? errors.flatNr : ''}
      >
        <label className="form-element__label" htmlFor="">
          Nr mieszkania
        </label>
        <Field id="flatNr" type="text" name="flatNr" />
      </FormElement>
      <FormElement
        validationStatus={errors.city ? 'invalid' : 'not-validated'}
        validationMessage={errors.city ? errors.city : ''}
      >
        <label className="form-element__label" htmlFor="">
          Miasto
        </label>
        <Field id="city" type="text" name="city" />
      </FormElement>
      <FormElement
        validationStatus={errors.postalCode ? 'invalid' : 'not-validated'}
        validationMessage={errors.postalCode ? errors.postalCode : ''}
      >
        <label className="form-element__label" htmlFor="">
          Kod pocztowy
        </label>
        <Field id="postalCode" type="text" name="postalCode" />
      </FormElement>
      <FormElement>
        <label className="form-element__label" htmlFor="country">
          Kraj
        </label>
        <Field id="country" type="text" name="country" disabled />
      </FormElement>
      <FormElement>
        <label className="form-element__label" htmlFor="nationality">
          Obywatelstwo
        </label>
        <Field
          id="nationality"
          type="text"
          name="nationality"
          disabled
          value="Polskie"
        />
      </FormElement>
    </FormGroup>
  );
};

export default AddressFormGroup;

import React from 'react';
import { Field } from 'formik';
import FormGroup from 'components/FormGroup/FormGroup';
import FormElement from 'components/FormElements/FormElement';
import { CONTENT_URLS } from 'helpers/url.helper';
import { formGroupShape } from 'interfaces/forms/formGroupShape';

export const agreementsTermsInitialValues = {
  hracingRegulationsConsent: false,
  maturityConsent: false
};

const AgreementsTermsFormGroup: React.FC<formGroupShape> = props => {
  const { errors } = props;
  return (
    <FormGroup title="Zgody regulaminowe">
      <FormElement
        extraClasses="form-element--full"
        validationStatus={
          errors.hracingRegulationsConsent ? 'invalid' : 'not-validated'
        }
        validationMessage={
          errors.hracingRegulationsConsent
            ? errors.hracingRegulationsConsent
            : ''
        }
      >
        <Field
          id="hracingRegulationsConsent"
          type="checkbox"
          name="hracingRegulationsConsent"
        />
        <label htmlFor="hracingRegulationsConsent">
          Potwierdzam, że zapoznałam(em) się z treścią{' '}
          <a
            href={CONTENT_URLS.terms}
            className="link-external"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Regulaminu serwisu</strong>
          </a>
          ,{' '}
          <a
            href={CONTENT_URLS.termsTotalizator}
            className="link-external"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Regulaminu Totalizatora Wyścigów Konnych</strong>
          </a>
          ,{' '}
          <a
            href={CONTENT_URLS.responsibleGame}
            className="link-external"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Regulaminem Odpowiedzialnej Gry</strong>
          </a>
          ,{' '}
          <a
            href={CONTENT_URLS.privacyRegulations}
            className="link-external"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Polityką prywatności</strong>
          </a>{' '}
          oraz akceptuję ich postanowienia.
        </label>
      </FormElement>
      <FormElement
        extraClasses="form-element--full"
        validationStatus={errors.maturityConsent ? 'invalid' : 'not-validated'}
        validationMessage={errors.maturityConsent ? errors.maturityConsent : ''}
      >
        <Field id="maturityConsent" type="checkbox" name="maturityConsent" />
        <label htmlFor="maturityConsent">
          Potwierdzam, że mam ukończone 18 lat.
        </label>
      </FormElement>
    </FormGroup>
  );
};

export default AgreementsTermsFormGroup;

import React from 'react';
import { Field } from 'formik';
import FormGroup from 'components/FormGroup/FormGroup';
import FormElement from 'components/FormElements/FormElement';
import { CONTENT_URLS } from 'helpers/url.helper';
import { formGroupShape } from 'interfaces/forms/formGroupShape';

export const agreementsRegulationsInitialValues = {
  rodoConsent: false
};

const AgreementsRegulationsFormGroup: React.FC<formGroupShape> = props => {
  const { errors } = props;
  return (
    <FormGroup title="Obowiązek informacyjny">
      <FormElement
        extraClasses="form-element--full"
        validationStatus={errors.rodoConsent ? 'invalid' : 'not-validated'}
        validationMessage={errors.rodoConsent ? errors.rodoConsent : ''}
      >
        <Field id="rodoConsent" type="checkbox" name="rodoConsent" />
        <label htmlFor="rodoConsent">
          <p>
            Administratorem Twoich danych osobowych jest Traf Zakłady Wzajemne
            Spółka z ograniczoną odpowiedzialnością z siedzibą w Warszawie, ul.
            Kijowska 1, 03-738 Warszawa, wpisana do rejestru przedsiębiorców
            Krajowego Rejestru Sądowego prowadzonego przez Sąd Rejonowy dla
            m.st. Warszawy w Warszawie, Wydział XIII Gospodarczy Krajowego
            Rejestru Sądowego, pod numerem KRS: 0000358998, REGON: 142435268,
            NIP: 1132805190.
          </p>
          <p>
            Administrator powołał Inspektora Ochrony Danych, z którym kontakt
            jest możliwy za pośrednictwem adresu email:{' '}
            <a href="mailto:iod@totalizator.pl">iod@totalizator.pl</a> w każdej
            sprawie dotyczącej przetwarzania Twoich danych osobowych.
            Szczegółowe informacje o przetwarzaniu danych osobowych{' '}
            <a href={CONTENT_URLS.privacyRegulations} className="link-external">
              znajdują się tutaj
            </a>
            .
          </p>
        </label>
      </FormElement>
    </FormGroup>
  );
};

export default AgreementsRegulationsFormGroup;

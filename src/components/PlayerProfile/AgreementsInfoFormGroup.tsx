import React from 'react';
import { Field } from 'formik';
import FormElement from 'components/FormElements/FormElement';
import FormGroup from 'components/FormGroup/FormGroup';

export const agreementsInfoInitialValues = {
  mailMarketingConsent: false,
  smsMarketingConsent: false,
  phoneMarketingConsent: false
};

export interface AgreementsInfoFormGroupShape {
  mailMarketingConsent?: boolean;
  smsMarketingConsent?: boolean;
  phoneMarketingConsent?: boolean;
}

const AgreementsInfoFormGroup: React.FC<
  AgreementsInfoFormGroupShape
> = props => {
  const {
    mailMarketingConsent,
    phoneMarketingConsent,
    smsMarketingConsent
  } = props;
  return (
    <FormGroup
      title="Zgody informacyjne"
      header="Wyrażam zgodę na przetwarzanie moich danych osobowych w celu otrzymywania od Traf - Zakłady Wzajemne Sp. z o.o. informacji handlowej oraz marketingowej za pomocą środków komunikacji elektronicznej:"
    >
      <FormElement extraClasses="form-element--30">
        <Field
          id="mailMarketingConsent"
          type="checkbox"
          name="mailMarketingConsent"
          checked={mailMarketingConsent}
        />
        <label htmlFor="mailMarketingConsent">e-mail</label>
      </FormElement>
      <FormElement extraClasses="form-element--30">
        <Field
          id="smsMarketingConsent"
          type="checkbox"
          name="smsMarketingConsent"
          checked={smsMarketingConsent}
        />
        <label htmlFor="smsMarketingConsent">SMS</label>
      </FormElement>
      <FormElement extraClasses="form-element--30">
        <Field
          id="phoneMarketingConsent"
          type="checkbox"
          name="phoneMarketingConsent"
          checked={phoneMarketingConsent}
        />
        <label htmlFor="phoneMarketingConsent">
          nr telefonu
          {/* (w celu realizacji połączeń telefonicznych z Graczem) */}
        </label>
      </FormElement>
    </FormGroup>
  );
};

export default AgreementsInfoFormGroup;

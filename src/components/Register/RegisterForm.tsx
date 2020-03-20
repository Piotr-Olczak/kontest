import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { Form, Formik, FormikActions, FormikProps } from 'formik';
import { Alert } from 'antd';
import Button from 'components/Button/Button';
import RegisterCookies from 'components/Register/RegisterCookies';
import AddressFormGroup from 'components/PlayerProfile/AddressFormGroup';
import AgreementsInfoFormGroup from 'components/PlayerProfile/AgreementsInfoFormGroup';
import AgreementsTermsFormGroup from 'components/PlayerProfile/AgreementsTermsFormGroup';
import BasicDataFormGroup from 'components/PlayerProfile/BasicDataFormGroup';
import FinancialDataFormGroup from 'components/PlayerProfile/FinancialDataFormGroup';
import PlayerDeclarationsFormGroup from 'components/PlayerProfile/PlayerDeclarationsFormGroup';
import PlayerLimitsFormGroup from 'components/PlayerProfile/PlayerLimitsFormGroup';
import AgreementsRegulationsFormGroup from 'components/PlayerProfile/AgreementsRegulations';
import { RegisterFormInitialValuesShape } from 'interfaces/register/register';
import { RegisterFormShape } from 'interfaces/register/register';
import { getRegisterFormSchema } from 'schemas/validation/forms/registerForm';
import { registerHelper } from 'helpers/register.helper';
import { APP_URLS } from 'helpers/url.helper';
import { AppContextShape, PasswordSettingsShape } from 'interfaces/interfaces';
import { AppContext } from 'components/AppState/AppState';
import { FieldsHelper } from 'helpers/fields.helper';
import { AxiosError } from 'axios';
import { systemMessagesHelper } from 'helpers/systemMessages.helper';

const RegisterForm: React.FC<RegisterFormShape> = props => {
  const changeStep: (value: any) => void = props.changeStep;

  const [registrationStatus, setRegistrationStatus] = useState('');
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState(
    'Błąd rejestracji'
  );

  const currentStep: number = props.currentStep;

  const step1ClassNames = classNames({
    'register-form': true,
    'register-form--active-step': currentStep === 1
  });
  const step2ClassNames = classNames({
    'register-form': true,
    'register-form--active-step': currentStep === 2
  });
  const step3ClassNames = classNames({
    'register-form': true,
    'register-form--active-step': currentStep === 3
  });

  const initialValues = props.initialValues;

  const handleChangeStep = (
    page: number,
    validateForm?: any,
    setErrors?: any
  ) => {
    if (typeof validateForm !== 'function') {
      changeStep(page);
    } else {
      validateForm().then((errors: any) => {
        if (currentStep === 1) {
          if (
            errors.firstName ||
            errors.lastName ||
            errors.email ||
            errors.password ||
            errors.phoneNumber ||
            errors.pesel ||
            errors.idDocumentNumber ||
            errors.birthYear ||
            errors.birthMonth ||
            errors.birthDay ||
            errors.street ||
            errors.houseNr ||
            errors.city ||
            errors.postalCode ||
            errors.country ||
            errors.nationality ||
            errors.bankAccountNumber ||
            errors.fundsSource ||
            errors.ownerFundsDeclaration
          ) {
          } else {
            setErrors({});
            changeStep(page);
          }
        } else if (currentStep === 2) {
          if (
            errors.hracingRegulationsConsent ||
            errors.maturityConsent ||
            errors.timeLimit1dHours ||
            errors.timeLimit1dMinutes ||
            errors.timeLimit1mHours ||
            errors.timeLimit1mMinutes
          ) {
          } else {
            setErrors({});
            changeStep(page);
          }
        } else if (currentStep === 3) {
          if (errors.rodoConsent) {
          } else {
            changeStep(page);
          }
        }
      });
    }
  };

  const handleCookiesAgreements = (setFieldValue: any) => {
    setFieldValue('cookiesConsent', true);
  };

  const handleSubmit = (
    values: RegisterFormInitialValuesShape,
    actions: FormikActions<RegisterFormInitialValuesShape>
  ) => {
    setRegistrationStatus('');
    const registerError = (error: AxiosError) => {
      setRegistrationErrorMessage(
        systemMessagesHelper.getSystemMessageByAxiosError(error)
      );
      setRegistrationStatus('error');
    };
    const playerCreationData = registerHelper.mapRegisterData(values);
    actions.setSubmitting(true);
    registerHelper
      .sendRegisterForm(playerCreationData)
      .then(() => setRegistrationStatus('success'))
      .catch(error => registerError(error))
      .finally(() => actions.setSubmitting(false));

    // clear messages
    actions.setStatus({
      msg: ''
    });
  };

  const { state } = useContext<AppContextShape>(AppContext);

  const playerLimits = {
    minPlayerLimits: state.systemSettings.minPlayerLimits,
    maxPlayerLimits: state.systemSettings.maxPlayerLimits
  };

  const passwordRequirements: PasswordSettingsShape = FieldsHelper.getPasswordRequirements(
    state
  );

  return (
    <>
      {registrationStatus === 'success' && (
        <Redirect
          to={{
            pathname: APP_URLS.registerConfirmation,
            state: { type: 'success' }
          }}
        />
      )}
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={getRegisterFormSchema(
          playerLimits,
          passwordRequirements
        )}
      >
        {(formikProps: FormikProps<RegisterFormInitialValuesShape>) => {
          const {
            values,
            errors,
            status,
            isSubmitting,
            setFieldValue,
            submitCount,
            validateForm,
            setErrors,
            isValidating
          } = formikProps;
          return (
            <Form className="form-elements form-elements--register register-form-wrapper">
              {registrationStatus === 'error' && (
                <Alert message={registrationErrorMessage} type="error" />
              )}
              <div className={step1ClassNames}>
                <RegisterCookies
                  handleCookiesField={handleCookiesAgreements.bind(
                    null,
                    setFieldValue
                  )}
                  cookieConsentValue={values.cookiesConsent}
                />
                <BasicDataFormGroup errors={errors} submitCount={submitCount} />
                <AddressFormGroup errors={errors} submitCount={submitCount} />
                <FinancialDataFormGroup
                  errors={errors}
                  submitCount={submitCount}
                />
                <div className="register-form__navigation register-form__navigation--single">
                  <Button
                    label="Dalej"
                    loading={isValidating}
                    onClickFunction={handleChangeStep.bind(
                      null,
                      2,
                      validateForm,
                      setErrors
                    )}
                  />
                </div>
              </div>
              <div className={step2ClassNames}>
                <AgreementsTermsFormGroup
                  errors={errors}
                  submitCount={submitCount}
                />
                <AgreementsInfoFormGroup />
                <PlayerLimitsFormGroup
                  errors={errors}
                  submitCount={submitCount}
                />
                <div className="register-form__navigation">
                  <Button
                    buttonStyle="empty"
                    label="Wstecz"
                    onClickFunction={handleChangeStep.bind(null, 1)}
                  />
                  <Button
                    label="Dalej"
                    loading={isValidating}
                    onClickFunction={handleChangeStep.bind(
                      null,
                      3,
                      validateForm,
                      setErrors
                    )}
                  />
                </div>
              </div>
              <div className={step3ClassNames}>
                <AgreementsRegulationsFormGroup
                  errors={errors}
                  submitCount={submitCount}
                />
                <PlayerDeclarationsFormGroup />
                <div className="register-form__navigation">
                  {status && status.msg && (
                    <p className="form-status form-status--error">
                      {status.msg}
                    </p>
                  )}
                  <Button
                    buttonStyle="empty"
                    label="Wstecz"
                    onClickFunction={handleChangeStep.bind(null, 2)}
                  />
                  <Button
                    label="Załóż Konto"
                    type="submit"
                    loading={isSubmitting}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default RegisterForm;

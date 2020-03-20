import * as yup from 'yup';
import React, { useContext } from 'react';
import { Formik, FormikProps, Form, FormikActions } from 'formik';
import { DebugJson } from 'helpers/debugJson';
import { userHelper } from 'helpers/user.helper';
import PasswordField from 'components/FormElements/PasswordField';
import { AppContextShape, PasswordSettingsShape } from 'interfaces/interfaces';
import { AppContext } from 'components/AppState/AppState';
import { FieldsHelper } from 'helpers/fields.helper';
import {
  getNewPasswordValidationSchema,
  getNewPasswordRepetitionSchema
} from 'schemas/validation/password';
import Button from 'components/Button/Button';
import { systemMessagesHelper } from 'helpers/systemMessages.helper';

const statuses = {
  success: 'Hasło zostało zmienione.'
};

interface ChangePasswordFormValuesShape {
  currentPassword: string;
  newPassword: string;
  newPasswordRepetition: string;
}

const initialValues: ChangePasswordFormValuesShape = {
  currentPassword: '',
  newPassword: '',
  newPasswordRepetition: ''
};

const handleChangePasswordFormSubmit = (
  values: ChangePasswordFormValuesShape,
  actions: FormikActions<ChangePasswordFormValuesShape>,
  props: ChangePasswordFormPropsShape
) => {
  actions.setStatus({ error: '', success: '' });
  actions.setSubmitting(true);

  userHelper
    .changeUserPassword(values.currentPassword, values.newPassword)
    .then(data => {
      actions.setStatus({
        success: statuses.success
      });
      actions.setValues(initialValues);
      if (props.onSuccess) {
        props.onSuccess();
      }
    })
    .catch(err => {
      actions.setStatus({
        error: systemMessagesHelper.getSystemMessageByAxiosError(err)
      });
    })
    .finally(() => {
      actions.setSubmitting(false);
    });
};

const getChangePasswordFormValidationSchema = (
  passwordRequirements: PasswordSettingsShape
) => {
  return yup.object().shape({
    currentPassword: yup.string().required('To pole jest puste'),
    newPassword: getNewPasswordValidationSchema(passwordRequirements),
    newPasswordRepetition: getNewPasswordRepetitionSchema('newPassword')
  });
};

interface ChangePasswordFormPropsShape {
  onSuccess?: () => void;
}

export const ChangePasswordForm: React.FC<
  ChangePasswordFormPropsShape
> = props => {
  const { state } = useContext<AppContextShape>(AppContext);

  const passwordRequirements = FieldsHelper.getPasswordRequirements(state);

  const changePasswordValidationSchema = getChangePasswordFormValidationSchema(
    passwordRequirements
  );

  return (
    <div>
      <Formik
        validateOnBlur={false}
        initialValues={initialValues}
        validateOnChange={false}
        validationSchema={changePasswordValidationSchema}
        onSubmit={(values, actions) =>
          handleChangePasswordFormSubmit(values, actions, props)
        }
      >
        {(formikProps: FormikProps<ChangePasswordFormValuesShape>) => {
          const {
            errors,
            status,
            isSubmitting /*, submitCount */
          } = formikProps;

          return (
            <Form>
              {status && status.error && (
                <p className="form-status form-status--error">{status.error}</p>
              )}
              {status && status.success && (
                <p className="form-status form-status--success">
                  {status.success}
                </p>
              )}

              <PasswordField
                validationStatus={
                  errors.currentPassword ? 'invalid' : 'not-validated'
                }
                validationMessage={
                  errors.currentPassword ? errors.currentPassword : ''
                }
                name="currentPassword"
                label="Obecne hasło"
              />
              <PasswordField
                validationStatus={
                  errors.newPassword ? 'invalid' : 'not-validated'
                }
                validationMessage={errors.newPassword ? errors.newPassword : ''}
                name="newPassword"
                label="Nowe hasło"
              />
              <PasswordField
                validationStatus={
                  errors.newPasswordRepetition ? 'invalid' : 'not-validated'
                }
                validationMessage={
                  errors.newPasswordRepetition
                    ? errors.newPasswordRepetition
                    : ''
                }
                name="newPasswordRepetition"
                label="Powtórz nowe hasło"
              />

              <Button
                label="Zmień hasło"
                type="submit"
                loading={isSubmitting}
              />
              <DebugJson {...formikProps} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export { statuses };

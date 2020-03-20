import { AxiosError } from 'axios';

import { AppContext } from 'components/AppState/AppState';
import Button from 'components/Button/Button';
import FormElement from 'components/FormElements/FormElement';
import { Field, Form, Formik, FormikActions, FormikProps } from 'formik';
import { authHelper } from 'helpers/auth.helper';
import { DebugJson } from 'helpers/debugJson';
import { loginFormValuesShape } from 'interfaces/forms/loginForm';
import { AppContextShape } from 'interfaces/interfaces';
import { PlayerAccountData } from 'interfaces/player/player';
import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { loginFormSchema } from 'schemas/validation/forms/loginForm';
import PasswordField from 'components/FormElements/PasswordField';
import { APP_URLS } from 'helpers/url.helper';
import { systemMessagesHelper } from 'helpers/systemMessages.helper';

const LoginForm: React.FC = () => {
  const { state, dispatch } = useContext<AppContextShape>(AppContext);

  const handleSubmit = (
    values: loginFormValuesShape,
    actions: FormikActions<loginFormValuesShape>
  ) => {
    actions.setSubmitting(true);
    // clear messages
    actions.setStatus({
      msg: ''
    });

    if (state.user.sessionExpired) {
      dispatch({
        type: 'updateUserSessionExpired',
        payload: {
          sessionExpired: false
        }
      });
    }

    authHelper
      .login(values.login, values.password)
      .then((data: PlayerAccountData) => {
        actions.setSubmitting(false);
        dispatch({
          type: 'setUserDetailsAndAuth',
          payload: {
            auth: true,
            details: data
          }
        });
      })
      .catch((error: AxiosError) => {
        actions.setStatus({
          msg: systemMessagesHelper.getSystemMessageByAxiosError(error)
        });

        authHelper.removeUserSession();

        actions.setSubmitting(false);
      });
  };

  /* Redirects after sucess login */
  if (state.user.details && state.user.details.accountStatus === 'CONFIRMED') {
    return <Redirect to={APP_URLS.userVerification} push={true} />;
  }

  if (state.user.isAuth) {
    return <Redirect to="/" push={true} />;
  }

  return (
    <div className="login-form">
      <Formik
        validateOnBlur={false}
        validateOnChange={true}
        initialValues={{ login: '', password: '' }}
        validationSchema={loginFormSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps: FormikProps<loginFormValuesShape>) => {
          const { errors, status, isSubmitting, submitCount } = formikProps;

          return (
            <Form>
              {status && status.msg && (
                <p className="form-status form-status--error">{status.msg}</p>
              )}

              <FormElement
                validationStatus={
                  submitCount && errors.login ? 'invalid' : 'not-validated'
                }
                validationMessage={
                  submitCount && errors.login ? errors.login : ''
                }
              >
                <label className="form-element__label" htmlFor="login">
                  Login (e-mail)
                </label>
                <div>
                  <Field type="text" name="login" disabled={isSubmitting} />
                </div>
              </FormElement>

              <PasswordField
                validationStatus={
                  submitCount && errors.password ? 'invalid' : 'not-validated'
                }
                validationMessage={
                  submitCount && errors.password ? errors.password : ''
                }
              />

              <div className="login-form__remind-password">
                <Link to="/przypomnij-haslo">Przypomnij hasło</Link>
              </div>

              <div className="login-form__actions">
                <Button
                  loading={isSubmitting}
                  label="Zaloguj się"
                  type="submit"
                  fullWidth={true}
                />
              </div>

              <DebugJson {...formikProps} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginForm;

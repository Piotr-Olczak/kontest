import { AppContext } from 'components/AppState/AppState';
import Button from 'components/Button/Button';
import FormElement from 'components/FormElements/FormElement';
import { Field, Form, Formik, FormikActions, FormikProps } from 'formik';
import { apiPostData } from 'helpers/apiConnector';
import { DebugJson } from 'helpers/debugJson';
import {
  RemindPasswordFormPropsShape,
  remindPasswordFormValuesShape
} from 'interfaces/forms/remindPasswordForm';
import { AppContextShape } from 'interfaces/interfaces';
import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { remindPasswordFormSchema } from 'schemas/validation/forms/remindPasswordForm';

const RemindPasswordForm: React.FC<RemindPasswordFormPropsShape> = (
  props: RemindPasswordFormPropsShape
) => {
  const { state } = useContext<AppContextShape>(AppContext);

  return (
    <div className="remind-password-form">
      {state.user.isAuth && <Redirect to="/" push={true} />}

      <Formik
        validateOnBlur={false}
        validateOnChange={true}
        initialValues={{ email: '' }}
        validationSchema={remindPasswordFormSchema}
        onSubmit={(
          values: remindPasswordFormValuesShape,
          actions: FormikActions<remindPasswordFormValuesShape>
        ) => {
          actions.setSubmitting(true);

          apiPostData(
            '/player-public/request-password-change-email',
            {
              userName: values.email
            },
            data => {
              props.changeRequestStatus(true);
            },
            error => {
              actions.setSubmitting(false);
              actions.setStatus({
                msg:
                  'Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się z nami'
              });
            }
          );
        }}
      >
        {(formikProps: FormikProps<remindPasswordFormValuesShape>) => {
          const { errors, status, isSubmitting, submitCount } = formikProps;

          return (
            <Form>
              <p className="form-status form-status--error">
                {status && status.msg}
              </p>

              {isSubmitting && <p>Wysyłanie...</p>}

              <FormElement
                validationStatus={
                  submitCount && errors.email ? 'invalid' : 'not-validated'
                }
                validationMessage={
                  submitCount && errors.email ? errors.email : ''
                }
              >
                <label className="form-element__label" htmlFor="email">
                  E-mail
                </label>
                <div>
                  <Field type="email" name="email" disabled={isSubmitting} />
                </div>
              </FormElement>

              <div className="form-block">
                <Button label="Wyślij" type="submit" disabled={isSubmitting} />
              </div>
              <div className="form-block">
                <Link to="/zaloguj">Powrót</Link>
              </div>

              <DebugJson {...formikProps} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RemindPasswordForm;

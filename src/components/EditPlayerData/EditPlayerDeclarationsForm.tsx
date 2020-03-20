import React, { useState } from 'react';
import { Form, Formik, FormikActions, FormikProps } from 'formik';
import { Alert } from 'antd';
import {
  AntStatusesShape,
  AntStatusShape
} from 'interfaces/antStatuses/antStatuses';
import Button from 'components/Button/Button';
import EditPlayerDeclarationsFormGroup from 'components/PlayerProfile/EditPlayerDeclarationsFormGroup';
import { PlayerOptionalConsentsData } from 'interfaces/player/player';
import { editPlayerDataHelper } from 'helpers/editPlayerData.helper';
import { editPlayerDeclarationsValidationSchema } from 'schemas/validation/forms/editPlayerDeclarations';

const statuses: AntStatusesShape = {
  success: {
    type: 'success',
    message: 'Ustawienia oświadczeń zostały zmienione.'
  },
  fail: {
    type: 'error',
    message: 'Błąd zmiany oświadczeń'
  }
};

interface EditPlayerDeclarationsFormShape {
  initialValues: PlayerOptionalConsentsData;
}

const EditPlayerDeclarationsForm: React.FC<
  EditPlayerDeclarationsFormShape
> = props => {
  const { initialValues } = props;

  const [
    editPlayerDeclarationsStatus,
    setEditPlayerDeclarationsStatus
  ] = useState<AntStatusShape>();

  const handleSubmit = (
    values: PlayerOptionalConsentsData,
    actions: FormikActions<PlayerOptionalConsentsData>
  ) => {
    setEditPlayerDeclarationsStatus(undefined);

    actions.setSubmitting(true);
    editPlayerDataHelper
      .sendOptionalConsentsDataForm(values)
      .then(() => {
        actions.setSubmitting(false);
        setEditPlayerDeclarationsStatus(statuses.success);
      })
      .catch(() => {
        actions.setSubmitting(false);
        setEditPlayerDeclarationsStatus(statuses.fail);
      });

    // clear messages
    actions.setStatus({
      msg: ''
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={editPlayerDeclarationsValidationSchema}
    >
      {(formikProps: FormikProps<PlayerOptionalConsentsData>) => {
        const {
          values,
          status,
          isSubmitting,
          isValidating,
          errors
        } = formikProps;
        return (
          <Form className="form-elements form-elements__edit-player-declarations edit-form-wrapper">
            {editPlayerDeclarationsStatus && (
              <Alert
                message={editPlayerDeclarationsStatus.message}
                type={editPlayerDeclarationsStatus.type}
              />
            )}

            <EditPlayerDeclarationsFormGroup {...values} errors={errors} />
            {status && status.msg && (
              <p className="form-status form-status--error">{status.msg}</p>
            )}
            <Button
              label="Zmień oświadczenia"
              type="submit"
              loading={isSubmitting || isValidating}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditPlayerDeclarationsForm;

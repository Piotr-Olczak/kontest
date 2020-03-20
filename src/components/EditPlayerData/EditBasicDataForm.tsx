import React, { useState, useRef } from 'react';
import { Form, Formik, FormikActions, FormikProps } from 'formik';
import { Alert, Modal } from 'antd';
import {
  AntStatusesShape,
  AntStatusShape
} from 'interfaces/antStatuses/antStatuses';
import Button from 'components/Button/Button';
import EditBasicDataFormGroup from 'components/PlayerProfile/EditBasicDataFormGroup';
import AddressFormGroup from 'components/PlayerProfile/AddressFormGroup';
import EditFinancialDataFormGroup from 'components/PlayerProfile/EditFinancialDataFormGroup';
import { editBasicDataFormSchema } from 'schemas/validation/forms/editBasicData';
import { editPlayerDataHelper } from 'helpers/editPlayerData.helper';

import {
  EditBasicDataInitialValuesShape,
  EditBasicDataFormShape
} from 'interfaces/EditPlayerData/editPlayerData';

const statuses: AntStatusesShape = {
  success: {
    type: 'success',
    message: 'Dane zostały zmienione.'
  },
  fail: {
    type: 'error',
    message: 'Błąd zmiany danych'
  }
};

const EditBasicDataForm: React.FC<EditBasicDataFormShape> = props => {
  const { initialValues } = props;

  const [editBasicDataStatus, setEditBasicDataStatus] = useState<
    AntStatusShape
  >();

  const passwordField = useRef<HTMLInputElement>(null);

  const sendForm = (
    values: EditBasicDataInitialValuesShape,
    password: string,
    actions: FormikActions<EditBasicDataInitialValuesShape>
  ) => {
    setEditBasicDataStatus(undefined);
    const playerChangeData = editPlayerDataHelper.mapBasicData(
      values,
      password
    );
    actions.setSubmitting(true);
    editPlayerDataHelper
      .sendEditBasicDataForm(playerChangeData)
      .then(() => {
        actions.setSubmitting(false);
        setEditBasicDataStatus(statuses.success);
      })
      .catch(() => {
        actions.setSubmitting(false);
        setEditBasicDataStatus(statuses.fail);
      });

    // clear messages
    actions.setStatus({
      msg: ''
    });
  };

  const showPasswordModal = (
    values: EditBasicDataInitialValuesShape,
    actions: FormikActions<EditBasicDataInitialValuesShape>
  ) => {
    Modal.confirm({
      title: 'Aby zatwierdzić zmiany wprowadź hasło',
      content: (
        <input
          ref={passwordField}
          type="password"
          name="password"
          className="form-element__basic-data-password"
        />
      ),

      okText: 'Zapisz zmiany',
      cancelText: 'Anuluj',
      className: 'edit-basic-data__modal',
      onOk() {
        const modalPassword =
          passwordField.current && passwordField.current.value
            ? passwordField.current.value
            : '';
        sendForm(values, modalPassword, actions);
      },
      onCancel() {
        actions.setSubmitting(false);
      }
    });
  };

  const handleSubmit = (
    values: EditBasicDataInitialValuesShape,
    actions: FormikActions<EditBasicDataInitialValuesShape>
  ) => {
    showPasswordModal(values, actions);
  };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={editBasicDataFormSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<EditBasicDataInitialValuesShape>) => {
        const { errors, status, isSubmitting, isValidating } = formikProps;
        return (
          <Form className="form-elements form-elements__edit-basic-data edit-form-wrapper">
            {editBasicDataStatus && (
              <Alert
                message={editBasicDataStatus.message}
                type={editBasicDataStatus.type}
              />
            )}
            <EditBasicDataFormGroup errors={errors} />
            <AddressFormGroup errors={errors} />
            <EditFinancialDataFormGroup errors={errors} />
            {status && status.msg && (
              <p className="form-status form-status--error">{status.msg}</p>
            )}
            <Button
              label="Zapisz zmiany"
              type="submit"
              loading={isSubmitting || isValidating}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditBasicDataForm;

import React, { useContext, useState, useRef } from 'react';
import { Formik, Form, FormikProps, Field } from 'formik';
import { Alert, Modal } from 'antd';

import FormElement from 'components/FormElements/FormElement';
import { AppContextShape } from 'interfaces/interfaces';
import { AppContext } from 'components/AppState/AppState';
import Button from 'components/Button/Button';
import { withdrawHelper } from 'helpers/withdraw.helper';
import { DebugJson } from 'helpers/debugJson';
import { DynamicData } from 'helpers/dynamic.data.helper';
import {
  AntStatusesShape,
  AntStatusShape
} from 'interfaces/antStatuses/antStatuses';
import { systemMessagesHelper } from 'helpers/systemMessages.helper';

interface WithdrawFormValuesShape {
  amount: number;
  bankAccountNumber: string;
}

const statuses: AntStatusesShape = {
  success: {
    type: 'success',
    message: 'Wypłata została zlecona.'
  },
  fail: {
    type: 'error',
    message: ''
  }
};

export const WithdrawForm: React.FC = () => {
  const { state, dispatch } = useContext<AppContextShape>(AppContext);

  const [withdrawStatus, setWithdrawStatus] = useState<AntStatusShape>();
  const [isLoading, setIsLoading] = useState(false);

  const passwordField = useRef<HTMLInputElement>(null);

  const maxAmount = state.user.details
    ? state.user.details.dynamicData.currentBalance
    : 0;

  const bankAccountNumber = state.user.details
    ? state.user.details.basicData.bankAccountNumber
    : '';

  const initialValues: WithdrawFormValuesShape = {
    amount: 0,
    bankAccountNumber
  };

  const showPasswordModal = (values: WithdrawFormValuesShape) => {
    Modal.confirm({
      title: 'Aby zatwierdzić wypłatę wprowadź hasło',
      content: (
        <input
          ref={passwordField}
          type="password"
          name="password"
          className="form-element__basic-data-password"
        />
      ),

      okText: 'Wypłać',
      cancelText: 'Anuluj',
      className: 'edit-basic-data__modal',
      onOk() {
        const modalPassword =
          passwordField.current && passwordField.current.value
            ? passwordField.current.value
            : '';
        sendWithdrawForm(values, modalPassword);
      },
      onCancel() {
        setIsLoading(false);
      }
    });
  };

  const handleWithdrawFormSubmit = (values: WithdrawFormValuesShape) => {
    showPasswordModal(values);
  };
  const sendWithdrawForm = (
    values: WithdrawFormValuesShape,
    password: string
  ) => {
    setIsLoading(true);
    withdrawHelper
      .requestWithdraw(values.amount, password)
      .then(data => {
        DynamicData.updateUserDynamicData(dispatch);
        setWithdrawStatus(statuses.success);
      })
      .catch(err => {
        statuses.fail.message = systemMessagesHelper.getSystemMessageByAxiosError(
          err
        );

        setWithdrawStatus(statuses.fail);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {withdrawStatus && (
        <Alert message={withdrawStatus.message} type={withdrawStatus.type} />
      )}

      <Formik
        initialValues={initialValues}
        onSubmit={(values: WithdrawFormValuesShape) => {
          handleWithdrawFormSubmit(values);
        }}
      >
        {(formikProps: FormikProps<WithdrawFormValuesShape>) => (
          <Form className="form-elements">
            <FormElement>
              <label className="form-element__label" htmlFor="amount">
                Kwota do wypłaty
              </label>
              <Field
                id="amount"
                type="number"
                name="amount"
                step="any"
                min={0}
                max={maxAmount}
              />
            </FormElement>
            <FormElement>
              <label
                className="form-element__label"
                htmlFor="bankAccountNumber"
              >
                Rachunek bankowy, na który dokonamy wypłaty
              </label>
              <Field
                disabled={true}
                id="bankAccountNumber"
                type="text"
                name="bankAccountNumber"
              />
            </FormElement>

            <Button
              label="Wypłać"
              type="submit"
              loading={isLoading}
              disabled={formikProps.values.amount < 1 || isLoading}
            />

            <DebugJson {...formikProps} />
          </Form>
        )}
      </Formik>
    </>
  );
};

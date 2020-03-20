import React, { useState, useContext } from 'react';
import { Modal, notification } from 'antd';
import { Field, Form, Formik } from 'formik';
import FormGroup from 'components/FormGroup/FormGroup';
import FormElement from 'components/FormElements/FormElement';
import Button from 'components/Button/Button';
import { userLimitsSettingsHelper } from 'helpers/userLimitsSettings.helper';
import { AppContextShape } from 'interfaces/interfaces';
import { AppContext } from 'components/AppState/AppState';

interface SelfExclusionShape {
  title: string;
  description: string;
  selfExclusionIntervals: number[];
  typeTextPastSingle: string;
  typeTextComplementary: string;
}

export const SelfExclusion: React.FC<SelfExclusionShape> = props => {
  const {
    title,
    description,
    selfExclusionIntervals,
    typeTextPastSingle,
    typeTextComplementary
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext<AppContextShape>(AppContext);
  const setBreakTime = (selfExclusionInterval: number) => {
    setIsLoading(true);

    userLimitsSettingsHelper
      .setSelfExclusion(selfExclusionInterval)
      .then(() => {
        setIsLoading(false);
        notification.success({ message: `Ustawiono ${typeTextPastSingle}` });

        dispatch({
          type: 'logoutUser'
        });
      })
      .catch(() => {
        notification.error({
          message: `Błąd ustawiania ${typeTextComplementary}`
        });
        setIsLoading(false);
      });
  };

  const handleSubmit = (values: { selfExclusionInterval: number }) => {
    Modal.confirm({
      title: `Czy na pewno chcesz ustawić ${typeTextPastSingle}?`,
      content: `Czy na pewno chcesz ustawić ${typeTextPastSingle}? Nie będziesz mieć dostępu do serwisu przez ten okres `,
      okText: 'Tak',
      okType: 'danger',
      cancelText: 'Anuluj',
      onOk() {
        setBreakTime(values.selfExclusionInterval);
      }
    });
  };

  const initialSelfExclusionInterval = selfExclusionIntervals[0];

  return (
    <FormGroup title={title} header={description}>
      <Formik
        initialValues={{ selfExclusionInterval: initialSelfExclusionInterval }}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormElement extraClasses="form-element__date-select">
            <Field
              id="selfExclusionInterval"
              component="select"
              name="selfExclusionInterval"
            >
              {selfExclusionIntervals.map(selfExclusionInterval => (
                <option
                  key={selfExclusionInterval}
                  value={selfExclusionInterval}
                >
                  {selfExclusionInterval}{' '}
                  {selfExclusionInterval === 1 ? 'dzień' : 'dni'}
                </option>
              ))}
            </Field>
          </FormElement>
          <footer className={'actions'}>
            <Button type={'submit'} label={'Zapisz'} loading={isLoading} />
          </footer>
        </Form>
      </Formik>
    </FormGroup>
  );
};

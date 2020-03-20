import { notification } from 'antd';
import { AppContext } from 'components/AppState/AppState';
import BasicLayout from 'components/BasicLayout/BasicLayout';
import Button from 'components/Button/Button';
import AgreementsInfoFormGroup, {
  AgreementsInfoFormGroupShape
} from 'components/PlayerProfile/AgreementsInfoFormGroup';
import { SettingsPageLayout } from 'components/SettingsPageLayout/SettingsPageLayout';
import { Form, Formik, FormikProps } from 'formik';
import { userHelper } from 'helpers/user.helper';
import { AppContextShape } from 'interfaces/interfaces';
import { PlayerOptionalMarketingConsents } from 'interfaces/player/player';
import React, { useContext, useState } from 'react';

export const ContactPage: React.FC = props => {
  const [isLoading, setIsLoading] = useState(false);

  const { state, dispatch } = useContext<AppContextShape>(AppContext);
  if (
    !state ||
    !state.user ||
    !state.user.details ||
    !state.user.details.optionalConsentsData
  )
    return null;

  const initialContactConsents = state.user.details.optionalConsentsData;

  const handleSubmit = (values: PlayerOptionalMarketingConsents) => {
    setIsLoading(true);
    userHelper
      .changeUserConsents({ ...initialContactConsents, ...values })
      .then(() => {
        setIsLoading(false);
        notification.success({ message: 'Zapisano zmiany kanałów kontaktu' });
        dispatch({
          type: 'updatePlayerOptionalMarketingConsents',
          payload: values
        });
      });
  };

  return (
    <BasicLayout>
      <SettingsPageLayout icon={'settings'} pageTitle="Kanały kontaktu">
        <Formik initialValues={initialContactConsents} onSubmit={handleSubmit}>
          {(formikProps: FormikProps<AgreementsInfoFormGroupShape>) => (
            <Form>
              <AgreementsInfoFormGroup {...formikProps.values} />
              <Button loading={isLoading} type={'submit'} label={'Zapisz'} />
            </Form>
          )}
        </Formik>
      </SettingsPageLayout>
    </BasicLayout>
  );
};

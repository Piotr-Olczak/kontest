import React, { useState, useContext, useEffect } from 'react';
import RegisterForm from 'components/Register/RegisterForm';
import RegisterHeader from 'components/Register/RegisterHeader';
import { addressInitialValues } from 'components/PlayerProfile/AddressFormGroup';
import { agreementsInfoInitialValues } from 'components/PlayerProfile/AgreementsInfoFormGroup';
import { agreementsTermsInitialValues } from 'components/PlayerProfile/AgreementsTermsFormGroup';
import { registerCookiesInitialValues } from 'components/Register/RegisterCookies';
import { basicDataInitialValues } from 'components/PlayerProfile/BasicDataFormGroup';
import { financialDataInitialValues } from 'components/PlayerProfile/FinancialDataFormGroup';
import { playerDeclarationsInitialValues } from 'components/PlayerProfile/PlayerDeclarationsFormGroup';
import { agreementsRegulationsInitialValues } from 'components/PlayerProfile/AgreementsRegulations';

import { fallbackPlayerLimitsInitialValues } from 'components/PlayerProfile/PlayerLimitsFormGroup';
import { AppContext } from 'components/AppState/AppState';
import { AppContextShape } from 'interfaces/interfaces';

const RegisterPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1 as number);

  const { state } = useContext<AppContextShape>(AppContext);
  const defaultPlayerLimits = state.systemSettings.defaultPlayerLimits;

  const playerLimitsInitialValues = {
    balanceLimit1d: defaultPlayerLimits
      ? defaultPlayerLimits.balanceLimit1d
      : fallbackPlayerLimitsInitialValues.balanceLimit1d,
    balanceLimit1m: defaultPlayerLimits
      ? defaultPlayerLimits.balanceLimit1m
      : fallbackPlayerLimitsInitialValues.balanceLimit1m,
    timeLimit1dHours: defaultPlayerLimits
      ? defaultPlayerLimits.timeLimit1d / 60 / 60
      : fallbackPlayerLimitsInitialValues['timeLimit1dHours'],
    timeLimit1dMinutes: 0,
    timeLimit1mHours: defaultPlayerLimits
      ? defaultPlayerLimits.timeLimit1m / 60 / 60
      : fallbackPlayerLimitsInitialValues['timeLimit1mHours'],
    timeLimit1mMinutes: 0
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialValues = {
    ...registerCookiesInitialValues,
    ...basicDataInitialValues,
    ...addressInitialValues,
    ...financialDataInitialValues,
    ...agreementsTermsInitialValues,
    ...agreementsInfoInitialValues,
    ...playerLimitsInitialValues,
    ...playerDeclarationsInitialValues,
    ...agreementsRegulationsInitialValues
  };

  return (
    <div className="register-wrapper">
      <RegisterHeader currentStep={currentStep} />
      <RegisterForm
        currentStep={currentStep}
        changeStep={setCurrentStep}
        initialValues={initialValues}
      />
    </div>
  );
};

export default RegisterPage;

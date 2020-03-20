import React from 'react';
import RegisterHeader from 'components/Register/RegisterHeader';
import RegisterConfirmation from 'components/RegisterConfirmation/RegisterConfirmation';

const RegisterConfirmationPage: React.FC = () => {
  return (
    <div className="register-wrapper">
      <RegisterHeader currentStep={4} />
      <RegisterConfirmation />
    </div>
  );
};
export default RegisterConfirmationPage;

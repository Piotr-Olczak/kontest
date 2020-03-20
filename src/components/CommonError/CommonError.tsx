import React from 'react';
import { Alert } from 'antd';

const CommonError: React.FC = () => {
  return (
    <Alert
      message="Błąd"
      description="Wystąpił błąd. Spróbuj ponownie lub skontaktuj się z nami."
      type="warning"
      showIcon
    />
  );
};

export default CommonError;

import React, { useState } from 'react';
import LoginHeader from 'components/Login/LoginHeader/LoginHeader';
import RemindPasswordForm from 'components/RemindPassword/RemindPasswordForm/RemindPasswordForm';
import RemindPasswordConfirmation from 'components/RemindPassword/RemindPasswordConfirmation/RemindPasswordConfirmation';
import { UniversalWrapper } from 'components/UniversalWrapper/UniversalWrapper';

const RemindPasswordPage: React.FC = () => {
  const [requestSent, setRequestSent] = useState(false);

  return (
    <UniversalWrapper>
      <LoginHeader>
        <h2>Zapomniałeś hasła?</h2>
        {!requestSent && (
          <p>Podaj adres e-mail do konta, dla którego chcesz odzyskać hasło.</p>
        )}
      </LoginHeader>

      {requestSent ? (
        <RemindPasswordConfirmation />
      ) : (
        <RemindPasswordForm
          requestSentStatus={requestSent}
          changeRequestStatus={setRequestSent}
        />
      )}
    </UniversalWrapper>
  );
};

export default RemindPasswordPage;

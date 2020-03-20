import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'antd';

const RemindPasswordConfirmation: React.FC = () => {
  return (
    <div>
      <Alert
        message="Na podany adres e-mail przesłane zostały dalsze instrukcje, które
        umożliwią resetowanie konta. Z przyczyn od nas niezależnych taki mail
        może trafić do SPAM — sprawdź także tam."
        type="success"
      />
      <div className="form-block">
        <Link to="/zaloguj" className="btn btn--full">
          Przejdź do logowania
        </Link>
      </div>
    </div>
  );
};

export default RemindPasswordConfirmation;

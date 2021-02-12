import React from 'react';
import { Link } from 'react-router-dom';
import { APP_URLS } from 'helpers/url.helper';

const LoginBlend: React.FC = () => {
  return (
    <div className="login-blend">
      <h2 className="login-blend__title">ZAREJESTRUJ SIĘ JUŻ DZIŚ!</h2>
      <p className="login-blend__post-title">
        Tylko pięć minut dzieli Cię od świata wyścigów konnych online.
      </p>

      <p>
        Wypełnij formularz rejestracyjny i poczuj emocje jakie daje ten
        szlachetny sport.
      </p>
      <p>
        {' '}
        Największa popularność wyścigów konnych to okres międzywojenny. Obecnie
        gonitwy przyciągają coraz to więcej zwolenników tej szlachetnej formy
        rywalizacji sportowej.
      </p>
      <Link to={APP_URLS.register} className="btn btn--full">
              Zarejestruj się
      </Link>
      <a href="https://www.youtube.com/watch?v=MgaDJuK2DA0" className="btn btn--full">Instrukcja video</a>
    </div>
  );
};

export default LoginBlend;

import React, { useContext } from 'react';
import { AppContext } from 'components/AppState/AppState';
import { AppContextShape } from 'interfaces/interfaces';

const SampleConsumer: React.FC = () => {
  const { state, dispatch } = useContext<AppContextShape>(AppContext);
  return (
    <div>
      {state.user.isAuth && state.user.details && (
        <p>Hello {state.user.details.basicData.firstName}</p>
      )}
      <button
        onClick={e =>
          dispatch({
            type: 'setMinPasswordLength',
            payload: 79
          })
        }
      >
        Nice button
      </button>
    </div>
  );
};

export default SampleConsumer;

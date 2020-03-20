import React, { useContext } from 'react';
import { AppContext } from '../AppState/AppState';
import StatusVocabulary from './StatusVocabulary';
import { getRandomProperty } from './StatusHandlerHelpers';

const StatusHandlerSampleUsage: React.FC = () => {
  const { dispatch } = useContext(AppContext);
  /**
   * @method handleAddStatus
   *
   * @param {string} from Component from which status has come
   * @param {string} status Status code received
   * @description This method calls the reducer action that adds the status to the state. If no parameters aregiven, the random stsatus is being added
   */
  const handleAddStatus = (from: string = '', status: string = '') => {
    from = from.length ? from : getRandomProperty(StatusVocabulary);
    status = status.length ? status : getRandomProperty(StatusVocabulary[from]);

    dispatch({
      type: 'addStatus',
      payload: {
        from,
        status
      }
    });
  };

  return (
    <div>
      <button
        onClick={() => handleAddStatus('raceStatuses', 'UNDER_CONSTRUCTION')}
      >
        ADD STATUS
      </button>
      or
      <button onClick={() => handleAddStatus()}>ADD RANDOM STATUS</button>
    </div>
  );
};

export default StatusHandlerSampleUsage;

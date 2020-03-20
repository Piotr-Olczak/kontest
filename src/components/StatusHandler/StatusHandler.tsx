import React, { useContext } from 'react';
import { AppContext } from 'components/AppState/AppState';
import StatusVocabulary from './StatusVocabulary';
import StatusTypes from './StatusTypes';
import { statusShape } from 'interfaces/interfaces';

const StatusHandler: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  /**
   * @method handleRemoveStatus
   *
   * @param {string} id Id of the status that should be removed
   * @description This method calls the reducer action that removes the status from the state
   */
  const handleRemoveStatus = (id: string) => {
    dispatch({
      type: 'removeStatus',
      payload: {
        id
      }
    });
  };

  /**
   * @method getStatusValues
   *
   * Gets status values (type and text) from the Status Vocabulary and class name and timer from the Status Types
   *
   * @param {string} from The indicator from which component the status has come
   * @param {string} status The status code to 'translate'
   * @description This method according to the given parameters, gets status values (type and text) from the Status Vocabulary and class name and timer from the Status Types
   * @return {object} The desired values for the given status code - Status text, class name for such status type and the timer value for the automatic status close
   */

  const getStatusValues = (from: string, status: string) => {
    const text = StatusVocabulary[from][status].text;
    const type = StatusVocabulary[from][status].type.toUpperCase(); //prevent from error due to lowerCase
    const { className, timer } = StatusTypes[type];

    return { text, className, timer };
  };

  return (
    <React.Fragment>
      {state && state.statuses.length ? (
        <ul className="status-handler">
          {state.statuses.map((item: statusShape, index: number) => {
            const statusId = item.id;
            // holds className, text and timer values
            const { text, className, timer } = getStatusValues(
              item.from,
              item.status
            );

            return (
              <li key={index} className={className} data-timer={timer}>
                {text}
                <button
                  className="status-handler__status-button--close"
                  onClick={e => handleRemoveStatus(statusId)}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </React.Fragment>
  );
};

export default StatusHandler;

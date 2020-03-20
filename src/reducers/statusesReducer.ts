import { statusesShape, statusShape, ActionShape } from 'interfaces/interfaces';
import { initialState } from 'components/AppState/AppState';
import uuid from 'uuid/v4';

export const statusesReducer = (
  state: statusesShape = initialState.statuses,
  action: ActionShape
): statusesShape => {
  let id: string = '';
  switch (action.type) {
    case 'removeStatus':
      id = action.payload.id;
      return state.filter((status: statusShape) => status.id !== id);

    case 'addStatus':
      let { from, status } = action.payload;
      id = uuid().toString();
      return state.concat([{ from, status, id }]);

    default:
      return state;
  }
};

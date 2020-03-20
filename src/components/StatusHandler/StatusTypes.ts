import { StatusTypesShape } from '../../interfaces/interfaces';

const StatusTypes: StatusTypesShape = {
  SUCCESS: {
    className: 'status-handler__status--success',
    timer: 15
  },
  WARNING: {
    className: 'status-handler__status--warning',
    timer: 15
  },
  ERROR: {
    className: 'status-handler__status--error',
    timer: 15
  }
};

export default StatusTypes;

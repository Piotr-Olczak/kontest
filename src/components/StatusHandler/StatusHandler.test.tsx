import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { statusesReducer } from 'reducers/statusesReducer';
import StatusHandler from './StatusHandler';
import { getRandomProperty } from './StatusHandlerHelpers';

afterEach(cleanup);

describe('The StatusHandler component', () => {
  it('should render', () => {
    const container = render(<StatusHandler />);
    expect(container).toMatchSnapshot();
  });

  it('should run a randomProperty method and return random property from given object', () => {
    const sampleObject = { one: 1 };
    expect(getRandomProperty(sampleObject)).toEqual('one');
  });

  it('should run addStatus method from reducer and return object with given data plus id', () => {
    const sampleReducerObject = {
      type: 'addStatus',
      payload: {
        from: 'raceStatuses',
        status: 'UNDER_CONSTRUCTION'
      }
    };

    expect(statusesReducer([], sampleReducerObject)).toHaveProperty([0, 'id']);

    expect(statusesReducer([], sampleReducerObject)).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: ''
        })
      ])
    );
  });
});

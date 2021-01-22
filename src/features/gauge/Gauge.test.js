import React from 'react';
import { Provider } from 'react-redux';
import * as rr from 'react-redux';
import { createStore } from 'redux';
import { render, screen } from '@testing-library/react';
import { Gauge } from './Gauge';

// Mock out redux
const initialState = {
  gauge: {
    reports: [],
    status: 'idle',
    error: null
  }
};
const store = createStore((state, action) => {
  switch (action.type) {
    case 'UPDATE_REPORTS':
      state.gauge.reports = action.reports;
      return state;
    case 'UPDATE_STATUS':
      state.gauge.status = action.status;
      return state;
    case 'UPDATE_ERROR':
      state.gauge.error = action.error;
      return state;
    default:
      return state;
  }
}, initialState);
const dispatch = jest.fn(() => {});
rr.useDispatch = () => {
  return dispatch;
};
rr.useSelector = (callback) => {
  return callback(store.getState());
}


describe('<Gauge />', () => {
  
  it('fetches data from the external api', async () => {
    store.dispatch({ type: 'UPDATE_STATUS', status: 'idle'});
    await render(<Provider store={store}><Gauge /></Provider>);
    const isCalled = dispatch.mock.calls.length;

    expect(isCalled).toBeTruthy();
  });

  it('displays status while loading', async () => {
    store.dispatch({ type: 'UPDATE_STATUS', status: 'loading'});
    await render(<Provider store={store}><Gauge /></Provider>);
    const isStatus = screen.queryAllByRole('status').length;

    expect(isStatus).toBeTruthy();
  });

  it('displays error on error', async () => {
    store.dispatch({ type: 'UPDATE_STATUS', status: 'failed'});
    store.dispatch({ type: 'UPDATE_ERROR', error: 'FindMe'});
    await render(<Provider store={store}><Gauge /></Provider>);
    const isErrorMessage = screen.queryAllByText('FindMe').length;

    expect(isErrorMessage).toBeTruthy();
  });

  it('displays the gauge on success', async () => {
    store.dispatch({ type: 'UPDATE_STATUS', status: 'succeeded'});
    await render(<Provider store={store}><Gauge /></Provider>);
    const areImages = screen.queryAllByRole('img').length;

    expect(areImages).toBeTruthy();
  });
  
});
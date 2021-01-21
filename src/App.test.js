import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock out fetch
global.fetch = async () => {
  return {
    ok: true,
    json: async () => {
      return { data: [] };
    }
  };
};

describe('<App />', () => {
  it('displays a title', async () => {
    await render(<Provider store={store}><App /></Provider>);
    const title = screen.queryByRole('heading');
    expect(title).not.toBeNull();
  });
  it('displays feedback', async () => {
    await render(<Provider store={store}><App /></Provider>);
    const status = screen.queryAllByRole('status');
    const images = screen.queryAllByRole('img');
    const either = status.length || images.length;

    expect(either).toBeTruthy();
  });
});
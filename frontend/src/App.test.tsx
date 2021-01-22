import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Just a basic exist test

test('renders main UI url form', () => {

  const result = render(<App />);
  const urlInput = result.container.querySelector('#url-input');
  const submitButton = result.container.querySelector('#url-submit-button');

  expect(urlInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});
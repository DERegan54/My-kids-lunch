import React from 'react';
import {render} from '@testing-library/react';
import ReviewForm from '../reviews/ReviewForm';

// Smoke test

it('should render without crashing', function() {
  render(<ReviewForm />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<ReviewForm />);
  expect(asFragment).toMatchSnapshot()
});
import React from 'react';
import {render} from '@testing-library/react';
import ReviewUpdateForm from '../reviews/ReviewUpdateForm';

// Smoke test
it('should render without crashing', function() {
  render(<ReviewUpdateForm />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<ReviewUpdateForm />);
  expect(asFragment).toMatchSnapshot()
});
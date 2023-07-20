import React from 'react';
import {render} from '@testing-library/react';
import LunchReviews from '../lunches/LunchReviews';

// Smoke test
it('should render without crashing', function() {
  render(<LunchReviews />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<LunchReviews />);
  expect(asFragment).toMatchSnapshot()
});
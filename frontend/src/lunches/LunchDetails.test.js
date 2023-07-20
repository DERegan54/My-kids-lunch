import React from 'react';
import {render} from '@testing-library/react';
import LunchDetails from '../lunches/LunchDetails';

// Smoke test
it('should render without crashing', function() {
  render(<LunchDetails />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<LunchDetails />);
  expect(asFragment).toMatchSnapshot()
});
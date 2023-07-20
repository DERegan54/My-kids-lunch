import React from 'react';
import {render} from '@testing-library/react';
import LunchCard from '../lunches/LunchCard';

// Smoke test
it('should render without crashing', function() {
  render(<LunchCard />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<LunchCard />);
  expect(asFragment).toMatchSnapshot()
});
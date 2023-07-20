import React from 'react';
import {render} from '@testing-library/react';
import LunchList from '../lunches/LunchList';

// Smoke test 
it('should render without crashing', function() {
  render(<LunchList />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<LunchList />);
  expect(asFragment).toMatchSnapshot()
});
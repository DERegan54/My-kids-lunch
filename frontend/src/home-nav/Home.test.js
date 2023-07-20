import React from 'react';
import {render} from '@testing-library/react';
import Home from '../home-nav/Home';

// Smoke test
it('should render without crashing', function() {
  render(<Home />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<Home />);
  expect(asFragment).toMatchSnapshot()
});
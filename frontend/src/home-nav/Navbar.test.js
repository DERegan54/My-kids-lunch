import React from 'react';
import {render} from '@testing-library/react';
import Navbar from '../home-nav/Navbar';

// Smoke test
it('should render without crashing', function() {
  render(<Navbar />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<Navbar />);
  expect(asFragment).toMatchSnapshot()
});


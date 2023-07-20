import React from 'react';
import {render} from '@testing-library/react';
import ProfileCard from '../users/ProfileCard';

// Smoke test
it('should render without crashing', function() {
  render(<ProfileCard />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<ProfileCard />);
  expect(asFragment).toMatchSnapshot()
});
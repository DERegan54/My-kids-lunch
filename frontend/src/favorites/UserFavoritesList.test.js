import React from 'react';
import {render} from '@testing-library/react';
import UserFavoritesList from '../favorites/UserFavoritesList';

// Smoke test
it('should render without crashing', function() {
  render(<UserFavoritesList />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<UserFavoritesList />);
  expect(asFragment).toMatchSnapshot()
});
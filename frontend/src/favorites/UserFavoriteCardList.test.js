import React from 'react';
import {render} from '@testing-library/react';
import UserFavoriteCardList from '../favorites/UserFavoriteCardList';

// Smoke test
it('should render without crashing', function() {
  render(<UserFavoriteCardList />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<UserFavoriteCardList />);
  expect(asFragment).toMatchSnapshot()
});
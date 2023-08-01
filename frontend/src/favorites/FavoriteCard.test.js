import React from 'react';
import {render} from '@testing-library/react';
import FavoriteCard from '../favorites/FavoriteCard';

// Smoke test
it('should render without crashing', function() {
  render(<FavoriteCard />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<FavoriteCard isFavorited={false} userFavoriteId={{}} removeFavorite={{}} />);
  expect(asFragment).toMatchSnapshot()
});
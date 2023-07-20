import React from 'react';
import {render} from '@testing-library/react';
import UserFavoritesList from '../favorites/UserFavoritesList';

// Smoke Test

test('it renders without crashing', function() {
  render(<UserFavoritesList />);
});
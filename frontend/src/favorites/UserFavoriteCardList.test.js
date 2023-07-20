import React from 'react';
import {render} from '@testing-library/react';
import UserFavoriteCardList from '../favorites/UserFavoriteCardList';

// Smoke Test

test('it renders without crashing', function() {
  render(<UserFavoriteCardList />);
});
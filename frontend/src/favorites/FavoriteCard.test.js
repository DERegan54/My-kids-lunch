import React from 'react';
import {render} from '@testing-library/react';
import FavoriteCard from '../favorites/FavoriteCard';

// Smoke Test

test('it renders without crashing', function() {
  render(<FavoriteCard />);
});
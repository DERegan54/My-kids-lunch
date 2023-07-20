import React from 'react';
import {render} from '@testing-library/react';
import LunchCard from '../lunches/LunchCard';

// Smoke Test

test('it renders without crashing', function() {
  render(<LunchCard />);
});
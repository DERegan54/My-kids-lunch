import React from 'react';
import {render} from '@testing-library/react';
import LunchDetails from '../lunches/LunchDetails';
// Smoke Test

test('it renders without crashing', function() {
  render(<LunchDetails />);
});
import React from 'react';
import {render} from '@testing-library/react';
import LunchList from '../lunches/LunchList';

// Smoke Test 

test('it renders without crashing', function() {
  render(<LunchList />);
});
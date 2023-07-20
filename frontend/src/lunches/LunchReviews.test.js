import React from 'react';
import {render} from '@testing-library/react';
import LunchReviews from '../lunches/LunchReviews';

// Smoke Test

test('it renders without crashing', function() {
  render(<LunchReviews />);
});
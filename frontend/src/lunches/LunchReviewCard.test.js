import React from 'react';
import {render} from '@testing-library/react';
import LunchReviewCard from '../lunches/LunchReviewCard';

// Smoke Test

test('it renders without crashing', function() {
  render(<LunchReviewCard />);
});
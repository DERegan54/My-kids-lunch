import React from 'react';
import {render} from '@testing-library/react';
import ReviewCard from '../reviews/ReviewCard';

// Smoke Test

test('it renders without crashing', function() {
  render(<ReviewCard />);
});
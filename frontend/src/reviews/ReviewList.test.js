import React from 'react';
import {render} from '@testing-library/react';
import ReviewList from '../reviews/ReviewList';

// Smoke Test 

test('it renders without crashing', function() {
  render(<ReviewList />);
});
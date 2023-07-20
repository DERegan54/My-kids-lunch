import React from 'react';
import {render} from '@testing-library/react';
import ReviewForm from '../reviews/ReviewForm';

// Smoke Test

test('it renders without crashing', function() {
  render(<ReviewForm />);
});
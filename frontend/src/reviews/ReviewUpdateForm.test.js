import React from 'react';
import {render} from '@testing-library/react';
import ReviewUpdateForm from '../reviews/ReviewUpdateForm';

// Smoke Test

test('it renders without crashing', function() {
  render(<ReviewUpdateForm />);
});
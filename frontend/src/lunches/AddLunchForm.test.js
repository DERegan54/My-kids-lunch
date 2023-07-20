import React from 'react';
import {render} from '@testing-library/react';
import AddLunchForm from '../lunches/AddLunchForm';

// Smoke Test

test('it renders without crashing', function() {
  render(<AddLunchForm />);
});
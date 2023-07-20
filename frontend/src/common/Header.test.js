import React from 'react';
import {render} from '@testing-library/react';
import Header from '../common/Header';

// Smoke Test

test('it renders without crashing', function() {
  render(<Header />);
});
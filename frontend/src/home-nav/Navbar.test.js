import React from 'react';
import {render} from '@testing-library/react';
import Navbar from '../home-nav/Navbar';

// Smoke Test

test('it renders without crashing', function() {
  render(<Navbar />);
});
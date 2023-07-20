import React from 'react';
import {render} from '@testing-library/react';
import Home from '../home-nav/Home';

// Smoke Test

test('it renders without crashing', function() {
  render(<Home />);
});
import React from 'react';
import {render} from '@testing-library/react';
import ProfileCard from '../users/ProfileCard';

// Smoke Test
test('it renders without crashing', function() {
  render(<ProfileCard />);
});
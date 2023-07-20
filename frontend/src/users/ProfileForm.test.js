import React from 'react';
import {render} from '@testing-library/react';
import ProfileForm from '../users/ProfileForm';

// Smoke Test

test('it renders without crashing', function() {
  render(<ProfileForm />);
});
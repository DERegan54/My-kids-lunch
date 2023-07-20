import React from 'react';
import {render} from '@testing-library/react';
import RegistrationForm from '../users/RegistrationForm';

// Smoke Test

test('it renders without crashing', function() {
  render(<RegistrationForm />);
});
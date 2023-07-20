import React from 'react';
import {render} from '@testing-library/react';
import LoginForm from '../users/LoginForm';

// Smoke Test

test('it renders without crashing', function() {
  render(<LoginForm />);
});
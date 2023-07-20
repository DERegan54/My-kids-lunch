import React from 'react';
import {render} from '@testing-library/react';
import Alert from '../common/Alert';

// Smoke Test

test('it renders without crashing', function() {
  render(<Alert />);
});
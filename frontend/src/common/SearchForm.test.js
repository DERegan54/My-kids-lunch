import React from 'react';
import {render} from '@testing-library/react';
import SearchForm from '../common/SearchForm';

// Smoke Test

test('it renders without crashing', function() {
  render(<SearchForm />);
});
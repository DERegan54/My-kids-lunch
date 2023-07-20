import React from 'react';
import {render} from '@testing-library/react';
import ProfileForm from '../users/ProfileForm';

// Smoke test
it('should render without crashing', function() {
  render(<ProfileForm />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<ProfileForm />);
  expect(asFragment).toMatchSnapshot()
});
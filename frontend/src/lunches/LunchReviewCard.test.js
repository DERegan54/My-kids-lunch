import React from 'react';
import {render} from '@testing-library/react';
import LunchReviewCard from '../lunches/LunchReviewCard';

// Smoke test

it('shouldrender without crashing', function() {
  render(<LunchReviewCard />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<LunchReviewCard />);
  expect(asFragment).toMatchSnapshot()
});
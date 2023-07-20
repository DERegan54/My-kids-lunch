import React from 'react';
import {render} from '@testing-library/react';
import ReviewCard from '../reviews/ReviewCard';

// Smoke test
it('should render without crashing', function() {
  render(<ReviewCard />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<ReviewCard/>);
  expect(asFragment).toMatchSnapshot()
});
import React from 'react';
import { MemoryRouter} from 'react-router-dom';
import {render} from '@testing-library/react';
import UserContext from '../users/UserContext';
import LunchCard from '../lunches/LunchCard';

// Smoke test
it('should render without crashing', function() {
  render(
    <MemoryRouter>
      <UserContext>
        <LunchCard lunch={{}} reviews={{}} isFavoried={false} />
      </UserContext>
    </MemoryRouter>
  );  
});


// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(
    <MemoryRouter>
      <UserContext>
        <LunchCard lunch-={{}} reviews={{}} isFavorited={false} />
      </UserContext>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot()
});
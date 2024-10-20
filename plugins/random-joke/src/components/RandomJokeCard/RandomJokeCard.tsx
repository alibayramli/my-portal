import { InfoCard } from '@backstage/core-components';
import { fetchApiRef, useApi } from '@backstage/core-plugin-api';
import React from 'react';
import { useAsync } from 'react-use';

export const RandomJokeCard = () => {
  const fetchapi = useApi(fetchApiRef);
  const state = useAsync(async () => {
    const response = await fetchapi.fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'text/plain',
      },
    });
    const joke = await response.text();
    return joke;
  }, []);

  return (
    <InfoCard>
      {state.loading && <div>Loading...</div>}
      {!state.loading && state.error && <div>Error: {state.error.message}</div>}
      {!state.loading && !state.error && <div>{state.value}</div>}
    </InfoCard>
  );
};

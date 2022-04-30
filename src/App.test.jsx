import { screen, render, userEvent, findByRole } from '@testing-library/react';
// import { userEvent } from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import App from './App';

const sinkExample = {
  breeds: [],
  categories: [{ id: 14, name: 'sinks' }],
  id: '8lu',
  url: 'https://cdn2.thecatapi.com/images/8lu.jpg',
  width: 3488,
  height: 2616,
};

const shoeExample = {
  breeds: [],

  id: '2jh',
  url: 'https://cdn2.thecatapi.com/images/2jh.jpg',
  width: 500,
  height: 335,
};

const server = setupServer(
  rest.get('https://api.thecatapi.com/v1/images/search', (req, res, ctx) =>
    res(ctx.json([sinkExample, shoeExample]))
  )
);

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('App', () => {
  it('Should render list of cat pics', async () => {
    render(<App />);
    const title = await screen.findByText(/the cat pic compendium/i);
    const imageList = await screen.findAllByAltText(/cat image/i);
    expect(title).toBeInTheDocument();
    expect(imageList.length).toEqual(2);
  });
});

it('dropdown menu shown on page with correct options', async () => {
  render(<App />);
  await screen.findByRole('combobox');
  await screen.findByRole('option', { name: 'all' });
  screen.getByRole('option', { name: 'sinks' });
});

it('should allow user to change category', async () => {
  render(<App />);

  const dropdown = await screen.findByRole('combobox');
  const sinks = await screen.findByRole('option', { name: 'sinks' });
  console.log('userEvent', userEvent);
  userEvent.selectOptions(
    // find the select element
    dropdown,
    // Find and select the 'sinks' option
    sinks
  );
  expect(sinks.selected).toBe(true);
});

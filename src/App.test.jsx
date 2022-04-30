import { screen, render, userEvent } from '@testing-library/react';
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

// describe('Select', () => {
//   it('Selecting a category should show the correct cat images', async () => {
//     render(<App />);
//     userEvent.selectOptions(
//       await screen.findByRole('combobox'), // why does react testing library call it "combobox"?
//       await screen.findByRole('option', { name: 'sink' })
//     );
//   });
// });

it('dropdown menu shown on page with correct options', async () => {
  render(<App />);
  await screen.findByRole('option', { name: 'all' });
  screen.getByRole('option', { name: 'sinks' });
});

// it('should allow user to change category', () => {
//   render(<App />);
//   userEvent.selectOptions(
//     // Find the select element
//     screen.getByRole('combobox'),
//     // Find and select the Ireland option
//     screen.getByRole('option', { name: 'all' })
//   );
//   expect(screen.getByRole('option', { name: 'all' }).selected).toBe(true);
// });

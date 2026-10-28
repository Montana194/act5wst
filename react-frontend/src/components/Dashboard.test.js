import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';

beforeEach(() => {
  global.fetch = jest.fn((url) => Promise.resolve({
    ok: true,
    json: () => Promise.resolve(url.endsWith('/categories')
      ? { success: true, data: [{ id: 1, name: 'Accessories', description: 'Everyday items' }] }
      : []),
  }));
});

afterEach(() => {
  delete global.fetch;
});

test('renders the store dashboard and loads category data', async () => {
  render(<Dashboard />);

  expect(screen.getByRole('heading', { name: /store overview/i })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /categories/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /orders/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /posts/i })).not.toBeInTheDocument();

  expect(await screen.findByText('Accessories')).toBeInTheDocument();
});

test('navigates to categories and filters records', async () => {
  render(<Dashboard />);

  await screen.findByText('Accessories');
  fireEvent.click(screen.getByRole('button', { name: /categories/i }));
  const search = screen.getByRole('textbox', { name: 'Search categories' });
  fireEvent.change(search, { target: { value: 'missing category' } });
  expect(screen.getByText('No categories found')).toBeInTheDocument();
  fireEvent.change(search, { target: { value: 'accessories' } });
  expect(screen.getByText('Accessories')).toBeInTheDocument();
});

test('reports partial API failure and retries the failed resource', async () => {
  global.fetch.mockImplementation((url) => url.endsWith('/orders')
    ? Promise.resolve({ ok: false, status: 503 })
    : Promise.resolve({ ok: true, json: async () => ({ data: [{ id: 1, name: 'Accessories' }] }) }));
  render(<Dashboard />);
  expect(await screen.findByText('Request failed with status 503.')).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Some data unavailable');
  global.fetch.mockResolvedValue({ ok: true, json: async () => ({ data: [{ id: 42, user: { name: 'Jane' }, date: '2026-10-28' }] }) });
  fireEvent.click(screen.getByRole('button', { name: /try again/i }));
  expect(await screen.findByText('Jane')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Connected to API'));
});

test('searches orders and displays newest orders first', async () => {
  global.fetch.mockResolvedValue({ ok: true, json: async () => [] });
  global.fetch.mockImplementation((url) => Promise.resolve({ ok: true, json: async () => url.endsWith('/orders')
    ? [{ id: 1, user: { name: 'Alice' }, date: '2026-10-01' }, { id: 2, user: { name: 'Jane' }, date: '2026-10-28' }]
    : [] }));
  render(<Dashboard />);
  await screen.findByText('Alice');
  fireEvent.click(screen.getByRole('button', { name: 'Orders' }));
  expect(screen.getAllByRole('row')[1]).toHaveTextContent('Jane');
  fireEvent.change(screen.getByRole('textbox', { name: 'Search orders' }), { target: { value: 'Alice' } });
  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.queryByText('Jane')).not.toBeInTheDocument();
});

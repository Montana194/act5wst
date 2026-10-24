import { render, screen } from '@testing-library/react';
import App from './App.jsx';

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
  render(<App />);

  expect(screen.getByRole('heading', { name: /good morning, admin/i })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /categories/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /orders/i })).toBeInTheDocument();

  expect(await screen.findByText('Accessories')).toBeInTheDocument();
});

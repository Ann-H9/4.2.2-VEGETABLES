
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import App from './App';
import { renderWithStore } from './test-utils';

vi.mock('@/shared/api/ProductService', () => ({
  fetchProduct: vi.fn().mockResolvedValue([
    { id: 1, name: 'Tomato - 1 KG', image: '/tomato.png', price: 2.5 },
    { id: 2, name: 'Cucumber - 500 G', image: '/cucumber.png', price: 1.7 }
  ])
}));

test('добавление товара обновляет счётчик корзины в Header', async () => {
  renderWithStore(<App />);

 
  await screen.findByText(/tomato/i);

  const addButtons = screen.getAllByRole('button', { name: /добавить в корзину/i });
  await userEvent.click(addButtons[0]);

  const cartButton = screen.getByRole('button', { name: /корзина/i });
  expect(within(cartButton).getByText('1')).toBeInTheDocument();
});


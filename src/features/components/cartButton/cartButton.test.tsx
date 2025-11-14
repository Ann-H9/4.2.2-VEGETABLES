import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithStore } from '@/app/test-utils';
import CartButton from './CartButton';
import { store } from '@//store/store';
import { addItem } from '@//store/cartSlice';

describe('CartButton', () => {
  it('отображает пустую корзину', () => {
    renderWithStore(<CartButton />);
    fireEvent.click(screen.getByRole('button', { name: /Корзина/i }));
    expect(screen.getByText(/empty/i)).toBeInTheDocument();
  });

  it('отображает товары в корзине', () => {
    store.dispatch(addItem({
      product: { id: 1, name: 'Potato - 1kg', price: 3, image: 'potato.png' },
      quantity: 2,
    }));

    renderWithStore(<CartButton />);
    fireEvent.click(screen.getByRole('button', { name: /Корзина/i }));
    expect(screen.getByText(/Potato/i)).toBeInTheDocument();
    expect(screen.getByText(/Total/i)).toBeInTheDocument();
  });
});
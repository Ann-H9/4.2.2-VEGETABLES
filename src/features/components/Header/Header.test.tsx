import { renderWithStore } from '@/app/test-utils';
import Header from './Header';
import { test, expect } from 'vitest';
import { screen, within } from '@testing-library/react';

test('рендерит логотип и кнопку корзины', () => {
  renderWithStore(<Header />);
  expect(screen.getByAltText(/магазин овощей/i)).toBeInTheDocument();
  const cartBtn = screen.getByRole('button', { name: /корзина/i });
  expect(cartBtn).toBeInTheDocument();
});

test('показывает бейдж количества при cartCount>0', () => {
  
  renderWithStore(<Header />);
  const cartBtn = screen.getByRole('button', { name: /корзина/i });
 
});
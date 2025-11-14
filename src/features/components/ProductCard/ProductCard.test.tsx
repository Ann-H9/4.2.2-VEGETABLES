import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithStore } from '@/app/test-utils';
import ProductCard from './ProductCard';
import { Product } from '@/shared/api/ProductService';

const mockProduct: Product = {
  id: 1,
  name: 'Tomato - 1kg',
  price: 2,
  image: 'tomato.png',
};

describe('ProductCard', () => {
  it('отображает название и цену', () => {
    renderWithStore(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/Tomato/i)).toBeInTheDocument();
    expect(screen.getByText(/\$2/i)).toBeInTheDocument();
  });

  it('увеличивает количество при клике', () => {
    renderWithStore(<ProductCard product={mockProduct} />);
    const plusButton = screen.getByRole('button', { name: /\+/i });
    fireEvent.click(plusButton);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('добавляет товар в корзину', () => {
    renderWithStore(<ProductCard product={mockProduct} />);
    const addButton = screen.getByRole('button', { name: /добавить в корзину/i });
    fireEvent.click(addButton);
    expect(screen.getByText(/Tomato/i)).toBeInTheDocument();
  });
});
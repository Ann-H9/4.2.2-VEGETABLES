import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithStore } from '@/app/test-utils';
import ProductList from './ProductList';
import { store } from '@/store/store';
import { fetchProducts } from '@/store/productsSlice';

describe('ProductList', () => {
  it('показывает состояние загрузки', () => {
    renderWithStore(<ProductList />);
    expect(screen.getByText(/Загрузка/i)).toBeInTheDocument();
  });

  it('загружает и отображает товары', async () => {
    
    await store.dispatch(fetchProducts());

    renderWithStore(<ProductList />);
    expect(await screen.findByText(/Apple/i)).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';
import Title from './Title';
import { expect, test } from 'vitest';

test('рендерит заголовок Catalog', () => {
  render(<Title />);
  expect(screen.getByRole('heading', { name: /catalog/i })).toBeInTheDocument();
});
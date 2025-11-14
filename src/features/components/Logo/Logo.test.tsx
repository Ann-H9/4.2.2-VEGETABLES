import { render, screen } from '@testing-library/react';
import Logo from './Logo';
import { test, expect } from 'vitest';

test('рендерит логотип с корректным alt и src', () => {
  render(<Logo />);
  const img = screen.getByAltText(/магазин овощей/i) as HTMLImageElement;
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src');
  expect(img.src).toMatch(/logo\.svg$/);
});
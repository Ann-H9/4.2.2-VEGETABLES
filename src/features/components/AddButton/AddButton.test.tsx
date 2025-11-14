import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddButton from './AddButton';
import { test, expect, vi } from 'vitest';

test('рендерит кнопку с правильным aria-label', () => {
  render(<AddButton />);
  expect(screen.getByRole('button', { name: /добавить в корзину/i })).toBeInTheDocument();
});

test('вызывает onClick при клике', async () => {
  const onClick = vi.fn();
  render(<AddButton onClick={onClick} />);
  await userEvent.click(screen.getByRole('button', { name: /добавить в корзину/i }));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('не кликается в disabled состоянии', async () => {
  const onClick = vi.fn();
  render(<AddButton onClick={onClick} disabled />);
  const btn = screen.getByRole('button', { name: /добавить в корзину/i });
  expect(btn).toBeDisabled();
  await userEvent.click(btn);
  expect(onClick).not.toHaveBeenCalled();
});
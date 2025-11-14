import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Count from './Count';
import { test, expect, vi } from 'vitest';

test('показывает текущее значение', () => {
  render(<Count value={2} onIncrease={() => {}} onDecrease={() => {}} />);
  expect(screen.getByText('2')).toBeInTheDocument();
});

test('нажатие "+" вызывает onIncrease', async () => {
  const onIncrease = vi.fn();
  render(<Count value={2} onIncrease={onIncrease} onDecrease={() => {}} />);
  await userEvent.click(screen.getByRole('button', { name: '+' }));
  expect(onIncrease).toHaveBeenCalledTimes(1);
});

test('нажатие "-" при value>1 вызывает onDecrease', async () => {
  const onDecrease = vi.fn();
  render(<Count value={2} onIncrease={() => {}} onDecrease={onDecrease} />);
  await userEvent.click(screen.getByRole('button', { name: '-' }));
  expect(onDecrease).toHaveBeenCalledTimes(1);
});

test('нажатие "-" при value=1 вызывает onRemove, если он передан', async () => {
  const onRemove = vi.fn();
  const onDecrease = vi.fn();
  render(<Count value={1} onIncrease={() => {}} onDecrease={onDecrease} onRemove={onRemove} />);
  await userEvent.click(screen.getByRole('button', { name: '-' }));
  expect(onRemove).toHaveBeenCalledTimes(1);
  expect(onDecrease).not.toHaveBeenCalled();
});

test('нажатие "-" при value=1 вызывает onDecrease, если onRemove не передан', async () => {
  const onDecrease = vi.fn();
  render(<Count value={1} onIncrease={() => {}} onDecrease={onDecrease} />);
  await userEvent.click(screen.getByRole('button', { name: '-' }));
  expect(onDecrease).toHaveBeenCalledTimes(1);
});
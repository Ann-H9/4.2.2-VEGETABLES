import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { render } from '@testing-library/react';

export function renderWithStore(ui: ReactNode) {
  return render(<Provider store={store}>{ui}</Provider>);
}
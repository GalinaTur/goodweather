import { render, screen, waitFor, act } from '@testing-library/react';
import ChartBlock from './ChartBlock';

test('renders correct location', () => {
  render(<ChartBlock />);
  expect(screen.getAllByTestId('datalabel').length).toBe(4);
})

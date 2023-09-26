import { render, screen, waitFor, act } from '@testing-library/react';
import LineChart from './LineChart';

test('renders correct location', () => {
  render(<LineChart />);
  expect(screen.getAllByTestId('datalabel').length).toBe(4);
})

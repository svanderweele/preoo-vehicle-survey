import { render, screen } from '@testing-library/react';
import App from './App';

test('renders questionaire title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Questionaire/i);
  expect(titleElement).toBeInTheDocument();
});

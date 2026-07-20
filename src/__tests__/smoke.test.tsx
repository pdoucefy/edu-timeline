import { render, screen } from '@testing-library/react';

import React from 'react';
import styled from 'styled-components';

import { smokeValue } from '@/lib/smoke-helper.ts';

const TestTitle = styled.h1`
  color: blue;
`;

const TestComponent: React.FC = () => (
  <div>
    <TestTitle data-testid="styled-title">Hello from styled-components</TestTitle>
    <p data-testid="alias-check">Alias works</p>
  </div>
);

describe('Smoke test', () => {
  it('runs a basic sanity assertion', () => {
    expect(true).toBe(true);
  });

  it('has jest-dom matchers available', () => {
    const element = document.createElement('div');
    element.textContent = 'Hello';
    document.body.appendChild(element);
    expect(element).toBeInTheDocument();
    document.body.removeChild(element);
  });

  it('renders a component with styled-components', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('styled-title')).toBeInTheDocument();
    expect(screen.getByTestId('styled-title')).toHaveTextContent('Hello from styled-components');
  });

  it('resolves @/* alias inside tests', () => {
    expect(smokeValue).toBe(42);
  });
});

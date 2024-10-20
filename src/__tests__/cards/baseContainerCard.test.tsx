import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BaseContainer } from '../../components/common/cards/BaseContainer';

describe('BaseContainer component', () => {
  
  it('renders children correctly', () => {
    render(
      <BaseContainer>
        <p>Test Content</p>
      </BaseContainer>
    );

    const childElement = screen.getByText(/test content/i);
    expect(childElement).toBeInTheDocument();
  });

  it('applies the default class name', () => {
    render(
      <BaseContainer>
        <p>Test Content</p>
      </BaseContainer>
    );

    const containerElement = screen.getByText(/test content/i).parentElement;
    expect(containerElement).toHaveClass('flex-col-center gap-4');
  });

  it('applies additional className when provided', () => {
    render(
      <BaseContainer className="bg-blue-500">
        <p>Test Content</p>
      </BaseContainer>
    );

    const containerElement = screen.getByText(/test content/i).parentElement;
    expect(containerElement).toHaveClass('bg-blue-500');
    expect(containerElement).toHaveClass('flex-col-center gap-4'); // Verifica que las clases predeterminadas aún se apliquen
  });

});

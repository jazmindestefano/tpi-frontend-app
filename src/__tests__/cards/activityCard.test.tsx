import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ActivityCard } from '../../components/common/cards/ActivityCard';

describe('ActivityCard component', () => {
  const actividad = {
    id: 1,
    name: "Actividad 1",
  };

  it('renders activity name correctly', () => {
    render(
      <MemoryRouter>
        <ActivityCard actividad={actividad} />
      </MemoryRouter>
    );

    const nameElement = screen.getByText(actividad.name);
    expect(nameElement).toBeInTheDocument();
  });

  it('renders "Ver respuestas" button', () => {
    render(
      <MemoryRouter>
        <ActivityCard actividad={actividad} />
      </MemoryRouter>
    );

    const buttonElement = screen.getByRole('button', { name: /ver respuestas/i });
    expect(buttonElement).toBeInTheDocument();
  });
});

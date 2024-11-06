import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomeProfesionalCard from '../../components/common/cards/ProfesionalHomeCard'
import { MemoryRouter } from 'react-router-dom'
import { ProfesionalPatient } from '@/interfaces'

describe('HomeProfesionalCard component', () => {
  it('renders "Agregar paciente" text when isAddPatient is true', () => {
    render(
      <MemoryRouter>
        <HomeProfesionalCard isAddPatient={true} />
      </MemoryRouter>
    )

    const addPatientText = screen.getByText(/Agregar paciente/i)
    expect(addPatientText).toBeInTheDocument()
  })

  it('renders patient name and age correctly when isAddPatient is false', () => {
    const patient: ProfesionalPatient = {
      id: 1,
      name: 'John Doe',
      image: 'john_doe.png',
      birthDate: '1994-03-23T01:23:45.678',
      email: ''
    }

    render(
      <MemoryRouter>
        <HomeProfesionalCard patient={patient} isAddPatient={false} />
      </MemoryRouter>
    )

    const nameElement = screen.getByText(patient.name)
    const ageElement = screen.getByText(/30 años/i)

    expect(nameElement).toBeInTheDocument()
    expect(ageElement).toBeInTheDocument()
  })
})

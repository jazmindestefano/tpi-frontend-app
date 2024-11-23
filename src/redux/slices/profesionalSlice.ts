import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NOT_YET_ASSIGNED_NUM, NOT_YET_ASSIGNED_STR } from '@config'

// to-do: create a Patient interface and use it in the PatientState interface
interface Patient {
  id: number
  name: string
  imageUrl: string
  age: number
}

interface ProfessionalState {
  patient: Patient
}

const initialState: ProfessionalState = {
  patient: {
    id: NOT_YET_ASSIGNED_NUM,
    name: NOT_YET_ASSIGNED_STR,
    imageUrl: NOT_YET_ASSIGNED_STR,
    age: NOT_YET_ASSIGNED_NUM
  }
}

const professionalSlice = createSlice({
  name: 'professional',
  initialState,
  reducers: {
    setPatient: (state, action: PayloadAction<Patient>) => {
      state.patient = action.payload
    }
  }
})

const { setPatient } = professionalSlice.actions
const professionalReducer = professionalSlice.reducer

export { setPatient, professionalReducer }

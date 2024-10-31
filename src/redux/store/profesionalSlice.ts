import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Patient } from '../../interfaces/interfaces'
import localStorageManager from '../../localStorage/localStorageManager'

interface PatientState {
  patient: Patient
}

const userLoaded = (localStorageManager.getItem('patient') as Patient) || { id: -1 }

const initialState: PatientState = {
  patient: userLoaded
}

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatient: (state, action: PayloadAction<Patient>) => {
      state.patient = action.payload
      localStorageManager.setItem('patient', action.payload)
    }
  }
})

export const { setPatient } = patientSlice.actions
export default patientSlice.reducer

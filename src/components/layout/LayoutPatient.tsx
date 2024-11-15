import { PatientHeader, Layout } from '@components'
import { FC } from 'react'

const LayoutPatient: FC = () => {
  return (
    <Layout
      className="font-comfortaa bg-[url('/fondo_clara.png')] bg-cover bg-center"
      aside={null}
      header={<PatientHeader />}
    />
  )
}

export default LayoutPatient

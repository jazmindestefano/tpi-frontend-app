import { PatientHeader } from '@components'
import Layout from './Layout'

const LayoutPaciente = () => {
  return (
    <Layout
      className="font-comfortaa bg-[url('/fondo_clara.png')] bg-cover bg-center"
      aside={null}
      header={<PatientHeader />}
    />
  )
}

export default LayoutPaciente

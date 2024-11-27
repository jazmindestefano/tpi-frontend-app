import { PatientHeader, Layout } from '@components'
import { useUserBackground } from '@hooks'
import { FC } from 'react'

const LayoutPatient: FC = () => {
  const background = useUserBackground()

  return (
    <Layout
      className={`font-comfortaa bg-cover bg-center bg-gray-500`}
      style={{
        backgroundImage: `url(${background ?? '/fondo_clara.png'})`
      }}
      aside={null}
      header={<PatientHeader />}
    />
  )
}

export default LayoutPatient

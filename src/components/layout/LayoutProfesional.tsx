import { AsideProfesional, ProfesionalHeader, Layout } from '@components'
import { FC } from 'react'

const LayoutProfesional: FC = () => {
  return <Layout className="font-poppins" aside={<AsideProfesional />} header={<ProfesionalHeader />} />
}

export default LayoutProfesional

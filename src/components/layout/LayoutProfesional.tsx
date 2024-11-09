import { AsideProfesional, ProfesionalHeader } from '@components'
import Layout from './Layout'

export default function LayoutProfesional() {
  return <Layout className="font-poppins" aside={<AsideProfesional />} header={<ProfesionalHeader />} />
}

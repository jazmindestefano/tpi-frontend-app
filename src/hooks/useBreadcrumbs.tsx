import { useLocation } from 'react-router-dom'

const useBreadcrumbs = () => {
  const location = useLocation()
  const pathname = location.pathname

  const pathSegments = pathname.split('/').filter(Boolean)

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`

    return {
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: path
    }
  })

  return [{ name: 'Inicio', path: '/profesional' }, ...breadcrumbs]
}

export default useBreadcrumbs

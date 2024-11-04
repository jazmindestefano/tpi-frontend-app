import { Navigate, Outlet } from 'react-router-dom'

interface PrivateRouteWrapperProps {
  isAuthorized: boolean
}

const PrivateRouteWrapper: React.FC<PrivateRouteWrapperProps> = ({
  isAuthorized
}: PrivateRouteWrapperProps): JSX.Element => {
  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRouteWrapper

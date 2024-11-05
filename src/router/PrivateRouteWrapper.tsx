import { Navigate, Outlet } from 'react-router-dom'
import SpinnerLoader from '../components/common/SpinnerLoader.tsx'

interface PrivateRouteWrapperProps {
  isLoading: boolean
  isAuthorized: boolean
}

const PrivateRouteWrapper: React.FC<PrivateRouteWrapperProps> = ({
  isLoading,
  isAuthorized
}: PrivateRouteWrapperProps): JSX.Element => {
  console.log('(PrivateRouteWrapper)', { isLoading, isAuthorized })
  return isLoading ? <SpinnerLoader /> : isAuthorized ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRouteWrapper

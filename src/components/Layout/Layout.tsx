import AppRouter from '../../router/Router'
import Header from './Header'

export const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <AppRouter />
    </>
  )
}
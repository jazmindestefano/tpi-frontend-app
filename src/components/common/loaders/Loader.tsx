import { FC } from 'react'

const Loader: FC = () => {
  console.log('Loader')
  return (
    <div className="flex justify-center items-center fixed inset-0" data-testid="spinner-loader">
      <img src="/c.svg" className="w-auto h-16 animate-spin" alt={'Cargando...'} />
    </div>
  )
}

export default Loader

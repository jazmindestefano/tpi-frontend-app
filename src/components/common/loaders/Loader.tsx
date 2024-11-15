import { FC } from 'react'

const Loader: FC = () => {
  return (
    <div className="flex justify-center items-center fixed inset-0" data-testid="spinner-loader">
      <img src="/c.svg" className="w-auto h-16 animate-spin" />
    </div>
  )
}

export default Loader

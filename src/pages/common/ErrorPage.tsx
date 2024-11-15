import { useRouteError } from 'react-router-dom'
import { FC } from 'react'

const ErrorPage: FC = () => {
  const error = useRouteError() as Error
  console.error(error)

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-h1">Error!</h1>
      <h1 className={'text-h1'}>{error.message}</h1>
    </div>
  )
}

export default ErrorPage

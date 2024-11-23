// from https://stackoverflow.com/questions/78592233/no-queryclient-set-use-queryclientprovider-to-set-one-error-when-trying-to-te
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, ReactNode } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider as ReduxProvider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { gameReducer, userReducer } from '@redux/slices'

interface ProvidersProps {
  children: ReactNode
}

const queryClient = new QueryClient()

const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer
  }
})

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ReduxProvider>
    </MemoryRouter>
  )
}

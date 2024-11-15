import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@config'
import { Provider } from 'react-redux'
import { TimerProvider } from '@context'
import store from '@redux/store'
import { Router } from '@router'
import { RouterProvider } from 'react-router-dom'

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TimerProvider>
          <RouterProvider router={Router} />
        </TimerProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App

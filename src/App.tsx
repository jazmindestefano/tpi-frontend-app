import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './config/reactQuery.ts'
import { Provider } from 'react-redux'
import store from './redux/store'
import RouterLayout from './components/layout/RouterLayout.tsx'

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterLayout />
      </QueryClientProvider>
    </Provider>
  )
}

export default App

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './config/reactQuery.ts'
import { Provider } from 'react-redux'
import store from './redux/store'
import Layout from './components/layout/Layout.tsx'

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </Provider>
  )
}

export default App

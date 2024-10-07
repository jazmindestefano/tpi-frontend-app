import { Layout } from "./components/Layout/Layout"
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./config/reactQuery.ts";

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  )
}

export default App

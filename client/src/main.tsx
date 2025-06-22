import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "@/app/providers/useAuthContext.tsx";
import '@/app/css/global.scss'
import { Provider } from "react-redux"
import { setupStore } from "@/app/providers/store/store.ts"

const queryClient = new QueryClient()
const store = setupStore()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <Provider store={store}>
              <AuthProvider>
                  <BrowserRouter>
                      <App />
                  </BrowserRouter>
              </AuthProvider>
          </Provider>
      </QueryClientProvider>
  </StrictMode>,
)

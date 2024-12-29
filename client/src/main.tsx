import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "@/context/useAuthContext.tsx";
import '@/css/global.scss'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
          </AuthProvider>
      </QueryClientProvider>
  </StrictMode>,
)

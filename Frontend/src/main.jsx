import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {QueryClientProvider,QueryClient, useQuery, useMutation} from "@tanstack/react-query"
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <QueryClientProvider client={queryClient}>
  <App />
  </QueryClientProvider>
  
 
  </BrowserRouter>
  </StrictMode>

)

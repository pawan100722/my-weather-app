import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MainComponent } from './components/main-component.tsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainComponent/>
    <ToastContainer/>
  </StrictMode>,
)

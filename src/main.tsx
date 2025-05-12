import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MainComponent } from './components/main-component.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainComponent/>
  </StrictMode>,
)

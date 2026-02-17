// se inyecta en el archivo index.html
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './index.css'

// este root se encuentra en el index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    
    <App /> {/* componente de recat que es la App */} 
  </StrictMode>,
)

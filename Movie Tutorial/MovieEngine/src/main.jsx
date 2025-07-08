import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // react-router-dom install gives this
import './css/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Encapsulating the APP component to provide routing features to it. */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </StrictMode>
)

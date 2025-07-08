import './css/App.css'
import NavBar from './components/NavBar'
import Favourites from './pages/Favourites'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './context/MovieContext'


function App() {
  return (
    // wrapper using the Provider/Context
    <MovieProvider>
      <div>
        <NavBar />
        <main className='main-content'>
          {
            /*
              Routes enables Route to set path for navigation
              PATH is the path for the component
              ELEMENT is the component to render when the path is reached 
            */
          }
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favourites' element={<Favourites />} />
          </Routes>
        </main>
      </div>
    </MovieProvider>

  )
}


export default App

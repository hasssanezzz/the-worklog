import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSnapshot } from 'valtio'

// Pages and components
import Navbar from './components/Navbar'
import ExerciseComponent from './pages/Exercise'
import Exercises from './pages/Exercises'
import Home from './pages/Home'
import Settings from './pages/Setttings'
import { state } from './store'

export default function App() {
  const { dark } = useSnapshot(state)

  useEffect(() => {
    if (dark) document.querySelector('html')?.classList.add('dark')
    else document.querySelector('html')?.classList.remove('dark')
  }, [dark])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/exercise/:id" element={<ExerciseComponent />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

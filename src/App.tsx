import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ExerciseComponent from './pages/Exercise'
import Exercises from './pages/Exercises'
import Home from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/exercise/:id" element={<ExerciseComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

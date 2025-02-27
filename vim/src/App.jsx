import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Workout from './pages/Workout'
import Tutorials from './pages/Tutorials'
import Gamify from './pages/Gamify'
import DietPlan from './pages/DietPlan'
import Profile from './pages/Profile'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/gamify" element={<Gamify />} />    
          <Route path="/diet-plan" element={<DietPlan />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
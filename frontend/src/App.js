import { Route, Routes } from 'react-router-dom'
import TopBar from './components/shared/TopBar'
import Login from './pages/Login'
import MitraChallenges from './pages/MitraChallenges'
import PostChallenge from './pages/PostChallenge'
import Signup from './pages/Signup'

function App() {
  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-challenge" element={<PostChallenge />} />
        <Route path="/my-challenges" element={<MitraChallenges />} />
      </Routes>
    </div>
  )
}

export default App

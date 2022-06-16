import { Route, Routes } from 'react-router-dom'
import TopBar from './components/shared/TopBar'
import Login from './pages/Login'
import MitraChallenges from './pages/MitraChallenges'
import PostChallenge from './pages/PostChallenge'
import RegistrantInformation from './pages/RegistrantInformation'
import RegistrantList from './pages/RegistrantList'
import Signup from './pages/Signup'

function App() {
  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-challenge" element={<PostChallenge />} />
        <Route path="/posted-challenges">
          <Route index element={<MitraChallenges />} />
          <Route path=":challengeId">
            <Route index element={<RegistrantList />} />
            <Route path=":registrantId" element={<RegistrantInformation />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App

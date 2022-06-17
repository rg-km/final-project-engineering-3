import { Route, Routes } from 'react-router-dom'
import TopBar from './components/shared/TopBar'
import Login from './pages/Login'
import MitraChallenges from './pages/MitraChallenges'
import PostChallenge from './pages/PostChallenge'
import RegistrantInformation from './pages/RegistrantInformation'
import RegistrantList from './pages/RegistrantList'
import Signup from './pages/Signup'
import ChallangeList from './pages/ChallangeList'

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
            <Route path=":regis trantId" element={<RegistrantInformation />} />
          </Route>
        </Route>
      </Routes>


    </div>
  )
}

export default App

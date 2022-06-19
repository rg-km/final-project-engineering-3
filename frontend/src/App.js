import { Route, Routes } from 'react-router-dom'
import TopBar from './components/shared/TopBar'
import Login from './pages/Login'
import MitraChallenges from './pages/MitraChallenges'
import MitraInformation from './pages/MitraInformation'
import MitraProfile from './pages/MitraProfile'
import PostChallenge from './pages/PostChallenge'
import RegistrantInformation from './pages/RegistrantInformation'
import RegistrantList from './pages/RegistrantList'
import Signup from './pages/Signup'
import FormPeneliti from './pages/FormPeneliti'
import ChallangeList from './pages/ChallangeList'
import PengajuanProposal from './pages/PengajuanProposal'

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
        <Route path="/mitra">
          <Route path="information" element={<MitraInformation />} />
          <Route path="profile" element={<MitraProfile />} />
        </Route>
      </Routes>


    </div>
  )
}

export default App

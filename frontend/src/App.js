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
import ChallengeInfo from './pages/ChallengeInfo'
import ChallangeList from './pages/ChallangeList'
import PengajuanProposal from './pages/PengajuanProposal'
import HomePage from './pages/HomePage'
import ProtectedRoute from './pages/ProtectedRoute'
import PublicRoute from './pages/PublicRoute'
import NotFound from './components/shared/NotFound'
import { ROLES } from './helper/constants'

function App() {
  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Mitra Routes */}
        <Route element={<ProtectedRoute role={ROLES.Mitra} />}>
          <Route path="add-challenge" element={<PostChallenge />} />
          <Route path="posted-challenges">
            <Route index element={<MitraChallenges />} />
            <Route path=":challengeId">
              <Route index element={<RegistrantList />} />
              <Route path=":registrantId" element={<RegistrantInformation />} />
            </Route>
          </Route>
          <Route path="mitra">
            <Route path="information" element={<MitraInformation />} />
            <Route path="profile" element={<MitraProfile />} />
          </Route>
        </Route>

        {/* Researcher Routes */}
        <Route element={<ProtectedRoute role={ROLES.Researcher} />}>
          <Route path="challenges">
            <Route index element={<ChallangeList />} />
            <Route path=":challengeId">
              <Route index element={<ChallengeInfo />} />
            </Route>
          </Route>
          <Route path="proposal-status" element={<PengajuanProposal />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App

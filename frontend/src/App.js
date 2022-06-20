import { useEffect } from 'react'
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
import useUserStore from './store/useUserStore'
import ChallengeInfo from './pages/ChallengeInfo'
import ChallangeList from './pages/ChallangeList'
import PengajuanProposal from './pages/PengajuanProposal'
import HomePage from './pages/HomePage'
import ProtectedRoute from './pages/ProtectedRoute'
import PublicRoute from './pages/PublicRoute'

function App() {
  const getUserData = useUserStore.getState().getUserData

  useEffect(() => {
    getUserData()
  }, [getUserData])

  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route element={<ProtectedRoute role="industry" />}>
          <Route path="/add-challenge" element={<PostChallenge />} />
          <Route path="/posted-challenges">
            <Route index element={<MitraChallenges />} />
            <Route path=":challengeId">
              <Route index element={<RegistrantList />} />
              <Route path=":registrantId" element={<RegistrantInformation />} />
            </Route>
          </Route>
          <Route path="/mitra">
            <Route path="information" element={<MitraInformation />} />
            <Route path="profile" element={<MitraProfile />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute role="researcher" />}>
          <Route path="/challenges">
            <Route index element={<ChallangeList />} />
            <Route path=":challengeId">
              <Route index element={<ChallengeInfo />} />
            </Route>
          </Route>
          <Route path="/proposal-status" element={<PengajuanProposal />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

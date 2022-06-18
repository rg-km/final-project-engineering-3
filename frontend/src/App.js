import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import TopBar from './components/shared/TopBar'
import Login from './pages/Login'
import MitraChallenges from './pages/MitraChallenges'
import MitraInformation from './pages/MitraInformation'
import MitraLayout from './pages/MitraLayout'
import MitraProfile from './pages/MitraProfile'
import PostChallenge from './pages/PostChallenge'
import RegistrantInformation from './pages/RegistrantInformation'
import RegistrantList from './pages/RegistrantList'
import Signup from './pages/Signup'
import useUserStore from './store/useUserStore'
import ChallangeList from './pages/ChallangeList'

function App() {
  const getUserData = useUserStore.getState().getUserData

  useEffect(() => {
    getUserData()
  }, [getUserData])

  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/add-challenge"
          element={
            <MitraLayout>
              <PostChallenge />
            </MitraLayout>
          }
        />
        <Route path="/posted-challenges">
          <Route
            index
            element={
              <MitraLayout>
                <MitraChallenges />
              </MitraLayout>
            }
          />
          <Route path=":challengeId">
            <Route
              index
              element={
                <MitraLayout>
                  <RegistrantList />
                </MitraLayout>
              }
            />
            <Route
              path=":registrantId"
              element={
                <MitraLayout>
                  <RegistrantInformation />
                </MitraLayout>
              }
            />
          </Route>
        </Route>
        <Route path="/mitra">
          <Route
            path="information"
            element={
              <MitraLayout>
                <MitraInformation />
              </MitraLayout>
            }
          />
          <Route
            path="profile"
            element={
              <MitraLayout>
                <MitraProfile />
              </MitraLayout>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App

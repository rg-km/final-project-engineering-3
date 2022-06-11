import TopBar from './shared/components/TopBar'
import { Route, Routes } from 'react-router-dom'
import Login from './login/Login'

function App() {
  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App

import TopBar from './shared/components/TopBar'
import { Route, Routes } from 'react-router-dom'
import Login from './login/Login'
import { Signup } from './signup/Signup'

function App() {
  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App

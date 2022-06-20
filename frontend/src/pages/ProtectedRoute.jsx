import { Navigate, Outlet } from 'react-router-dom'
import useUserStore from '../store/useUserStore'

function ProtectedRoute({ role }) {
  const user = useUserStore((state) => state.user)

  if (user?.role === role) return <Outlet />
  return <Navigate to="/login" />
}

export default ProtectedRoute

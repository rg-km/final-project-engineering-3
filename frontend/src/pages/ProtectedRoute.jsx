import { Navigate, Outlet } from 'react-router-dom'
import NotFound from '../components/shared/NotFound'
import useUserStore from '../store/useUserStore'

function ProtectedRoute({ role }) {
  const user = useUserStore((state) => state.user)

  if (!user) return <Navigate to="/login" />
  if (user?.role === role) return <Outlet />
  if (user?.role !== role) return <NotFound />
}

export default ProtectedRoute

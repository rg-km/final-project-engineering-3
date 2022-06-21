import { Navigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'

function PublicRoute({ children }) {
  const user = useUserStore((state) => state.user)

  if (user?.role === 'industry') return <Navigate to="/posted-challenges" />
  if (user?.role === 'researcher') return <Navigate to="/challenges" />
  return children
}

export default PublicRoute

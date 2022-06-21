import { Navigate, useLocation } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import { ROLES } from '../helper/constants'

function PublicRoute({ children }) {
  const user = useUserStore((state) => state.user)
  const location = useLocation()

  const defaultRedirect = user?.role === ROLES.Mitra ? '/posted-challenges' : '/challenges'
  const from = location.state?.from?.pathname || defaultRedirect

  if (user) return <Navigate to={from} />
  return children
}

export default PublicRoute
